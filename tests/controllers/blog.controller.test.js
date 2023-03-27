/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
// eslint-disable-next-line no-undef
const mocks = require('node-mocks-http');
const blogController = require('../../controllers/blog.controller');

const singleBlog = {
    title: 'Introduction to Neural Network',
    story: 'A neural network is a method in artificial intelligence.',
};
const multipleBlogs = [
    {
        title: 'Introduction to Deep Learning',
        story: 'Deep learning is a subfield of machine learning that is inspired by the structure and function of the human brain',
        id: '12c0f434-63d3-48aa-a126-04bb04776f25',
        authorId: '920ccf4f-3fa9-4eed-a1c3-0751ec2e7e33',
        createdAt: '2023-03-25T12:33:14.906Z',
        updatedAt: '2023-03-25T12:33:14.906Z',

    },
    {
        title: 'Introduction to Software Project Management',
        story: 'Software in project management is dedicated to the planning, scheduling, resource allocation, execution, tracking, and delivery of software and web projects',
        id: '12c0f434-63d3-48aa-a126-04bb04776f25',
        authorId: '920ccf4f-3fa9-4eed-a1c3-0751ec2e7e33',
        createdAt: '2023-03-25T12:33:14.906Z',
        updatedAt: '2023-03-25T12:33:14.906Z',
    },
];

describe('Get a blog', () => {
    test('Get a blog by blog id in json format', async () => {
        jest.spyOn(blogController, 'getAllBlogs').mockResolveValue(multipleBlogs[0]);
        const res =mocks.createResponse();
    });
});
