const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User, Project, Card, Task } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
    Query: {
       me: async (_, args, context) => {
            if (!context.user) {
                throw new AuthenticationError(
                    'Could not authenticate user'
                );
            }

            try {
                const userData = await User.findOne({
                    _id: context.user._id
                });

                return userData;
            } catch (error) {
                console.error(
                    'Error fetching user data:',
                    error
                );

                throw new Error('Internal server error');
            }
        },
        users: async(parent, args, context) => {
            return await User.find({}).select('-__v');
        },
        project: async (parent, { id }) => {
            try {
                const projectData = await Project.findById(id);

                if (!projectData) {
                    throw new Error('Project not found');
                }

                const tasks = await Task.find({ project: id });
                const cards = await Card.find({ project: id });

                return {
                    ...projectData.toObject(),
                    tasks,
                    cards
                };

            } catch (error) {
                console.error('Error fetching project data:', error);
                throw new Error('Internal server error');
            }
        },
        projectBoard: async (_, { projectId }) => {
            try {
                const project = await Project.findById(projectId);

                if (!project) {
                    throw new Error('Project not found');
                }

                const tasks = await Task.find({ project: projectId });
                const cards = await Card.find({ project: projectId });

                return {
                    ...project.toObject(),
                    tasks,
                    cards
                };

            } catch (error) {
                console.error('Error fetching project board:', error);
                throw new Error('Internal server error');
            }
        },
        projects: async() => {
            return await Project.find({});
        },
        card: async (parent, {id}) => {
            try { 
                const cardData = await Card.findById(id)
                
                if (!cardData) {
                    throw new Error('Card not found');
                }
                return cardData;
            } catch (error) {
                console.error('Error fetching card data:', error);
                throw new Error ('Internal server error')
            }
        },
        cards: async () => {
            return await Card.find({})
        },
        task: async (parent, {id}) => {
            try {
                const taskData = await Task.findById(id)

                if (!taskData) {
                    throw new Error ('Task not found')
                }
                return taskData;
            } catch (error) {
                console.error('Error fetching task data:', error);
                throw new Error ('Internal server error')
            }
        },
        tasks: async () => {
            return await Task.find({})
        }
    },

    Mutation: {
        addUser: async (parent, { userInput }) => {
            console.log("received arguments:", userInput);
            try {
                const user = await User.create(userInput);
                const token = signToken(user);
                return {token, user };
            }
            catch (error) {
                console.error('Error creating user:', error);
                throw new Error('Error creating user');
            }
        },
       login: async (parent, { email, password }) => {
            const user = await User.findOne({ email }).select('+password');

            if (!user) {
                throw new AuthenticationError('Not a valid user');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect password');
            }

            const token = signToken(user);

            return {
                token,
                user
            };
        },
        editUser: async(parent, { id, userInput }, context) => {
            if (context.user._id.toString() !== id && context.user.role !== 'admin') {
                throw new AuthenticationError("Not allowed");
            }

            try {
                const updatedUser = await User.findByIdAndUpdate(
                    id,
                    { $set: userInput },
                    { new: true}
                );

                if (!updatedUser) {
                    throw new Error("User not found");
                }

                return updatedUser;
            } catch (error) {
                console.error("Error editing user:", error);
                throw new Error('Failed to Edit user')
            }
        },


    }
}

module.exports = resolvers;