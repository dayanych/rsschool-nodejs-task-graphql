import { GraphQLFloat, GraphQLList, GraphQLObjectType, GraphQLString } from 'graphql';
import { UUIDType } from '../../../types/uuid.js';
import { Context } from '../../../interfaces/context.interface.js';
import { ProfileType } from '../../profiles/types/profile.type.js';
import { PostType } from '../../posts/types/post.type.js';
import DataLoader from 'dataloader';
import { Post } from '../../../entities/post.js';
import { User } from '../../../entities/user.js';

interface UserParent {
  id: string;
}

export const UserType: GraphQLObjectType<UserParent, Context> = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: {
      type: UUIDType,
    },
    name: {
      type: GraphQLString,
    },
    balance: {
      type: GraphQLFloat,
    },
    profile: {
      type: ProfileType,
      resolve: async (parent: UserParent, __, context: Context) => {
        const { prisma, dataloaders } = context;

        let dl = dataloaders.get('profile');

        if (!dl) {
          dl = new DataLoader(async (ids: readonly string[]) => {
            const profiles = await prisma.profile.findMany({
              where: {
                userId: {
                  in: [...ids]
                }
              }
            });

            const sortedProfiles = ids.map((id) => profiles.find((profile) => profile.userId === id));

            return sortedProfiles;
          });
          dataloaders.set('profile', dl);
        }

        return dl.load(parent.id);
      }
    },
    posts: {
      type: new GraphQLList(PostType),
      resolve: async (parent: UserParent, __, context: Context) => {
        const { prisma, dataloaders } = context;

        let dl = dataloaders.get('posts');

        if (!dl) {
          dl = new DataLoader(async (ids: readonly string[]) => {
            const posts = await prisma.post.findMany({
              where: {
                authorId: {
                  in: [...ids],
                },
              },
            });

            const postsObjectWithAuthor = posts.reduce((acc, curr) => {
              if (!acc[curr.authorId]) {
                acc[curr.authorId] = [];
              }

              acc[curr.authorId].push(curr);

              return acc;
            }, {} as {[key: string]: Post[]},
          );

            const sortedPosts = ids.map((id) => postsObjectWithAuthor[id]);
            return sortedPosts;
          });
          dataloaders.set('posts', dl);
        }

        return dl.load(parent.id);
      }
    },
    userSubscribedTo: {
      type: new GraphQLList(UserType),
      resolve: async (parent: UserParent, __, context: Context) => {
        const { prisma, dataloaders } = context;
        let dl = dataloaders.get('userSubscribedTo');

        if (!dl) {
          dl = new DataLoader(async (ids: readonly string[]) => {
            const users = await prisma.user.findMany({
              where: {
                subscribedToUser: {
                  some: {
                    subscriberId: {
                      in: [...ids]
                    }
                  }
                }
              },
              include: {
                subscribedToUser: true,
              },
            });

            const usersObjectWithSubscribers = users.reduce((acc, curr) => {
              curr.subscribedToUser.map((subscriber) => {
                if (!acc[subscriber.subscriberId]) {
                  acc[subscriber.subscriberId] = [];
                }

                acc[subscriber.subscriberId].push(curr);
              });

              return acc;
            }, {} as {[key: string]: User[]});

            const sortedPosts = ids.map((id) => usersObjectWithSubscribers[id]);

            return sortedPosts;
          });

          dataloaders.set('userSubscribedTo', dl);
        }

        return await dl.load(parent.id) ?? [];
      },
    },
    subscribedToUser: {
      type: new GraphQLList(UserType),
      resolve: async (parent: UserParent, __, context: Context) => {
        const { prisma, dataloaders } = context;
        let dl = dataloaders.get('subscribedToUser');
        if (!dl) {
          dl = new DataLoader(async (ids: readonly string[]) => {
            const users = await prisma.user.findMany({
              where: {
                userSubscribedTo: {
                  some: {
                    authorId: {
                      in: [...ids]
                    }
                  }
                }
              },
              include: {
                userSubscribedTo: true,
              },
            });

            const usersObjectWithSubscribers = users.reduce((acc, curr) => {
              curr.userSubscribedTo.map((author) => {
                if (!acc[author.authorId]) {
                  acc[author.authorId] = [];
                }

                acc[author.authorId].push(curr);
              });

              return acc;
            }, {} as {[key: string]: User[]});

            const sortedUsers = ids.map((id) => usersObjectWithSubscribers[id]);

            return sortedUsers;
          });

          dataloaders.set('subscribedToUser', dl);
        }

        return await dl.load(parent.id) ?? [];
      },
    }
  })
});
