const typeDefs =`

    scalar Date

    type Auth {
        token: String!
        user: User!
    }

    type Query {
        me: User
        users: [User]
        projects: [Project]
        cards: [Card]
        tasks: [Task]
        project(id: ID!): Project
        card(id: ID!): Card
        task(id:ID!): Task
    }

    type ProjectMember {
        user: User!
        role: String!
    }
    
    type User {
        _id: ID!
        username: String!
        displayName: String!
        email: String!
        photoUrl: String
        role: String
        isVerified: Boolean
        verificationToken: String
        lastLoginAt: Date
        createdAt: Date
        updatedAt: Date
        projects: [Project]
        tasks: [Task]
        cards: [Card]
    }

    type Project {
        _id: ID!
        project_name: String!
        description: String
        share_id: String
        color: String
        owner: User!
        members: [ProjectMember!]
        createdAt: Date
        updatedAt: Date
    }

    type Card {
        _id: ID!
        content: String!
        category: String!
        project: Project
        owner: User!
        createdAt: Date
        updatedAt: Date
    }
    
    type Task {
        _id: ID!
        content: String!
        status: TaskStatus
        due_date: Date
        user: User!
        project: Project
        createdAt: Date
        updatedAt: Date
    }

    enum TaskStatus {
        todo
        in_progress
        done
    }

    input UserInput {
        username: String!
        displayName: String!
        email: String!
        password: String!
        photoUrl: String
        role: String
        isVerified: Boolean
        verificationToken: String
        lastLoginAt: Date
    }

    input ProjectInput {
        project_name: String!
        description: String
        share_id: String
        color: String
        owner: ID!
        members: [ID!]
    }

    input CardInput {
        content: String!
        category: String!
        project: ID
        owner: ID!
    }

    input TaskInput {
        content: String!
        project: ID
        owner: ID!
        status: TaskStatus
        due_date: Date
    }

type Mutation {
    login(email: String!, password: String!): Auth
    addUser(userInput: UserInput!): User
    editUser(id: ID!, userInput: UserInput!): User

    addProject(projectInput: ProjectInput!): Project
    editProject(projectId: ID!, projectInput: ProjectInput!): Project
    deleteProject(id: ID!): Boolean

    addCard(cardInput: CardInput!): Card
    editCard(cardId: ID!, cardInput: CardInput!): Card
    deleteCard(id: ID!): Boolean

    addTask(taskInput: TaskInput!): Task
    editTask(taskID: ID!, taskInput: TaskInput!): Task
    deleteTask(id: ID!): Boolean
}

`

export default typeDefs;