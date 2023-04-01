
describe('Testing Blog Controller', () => {
    describe('Testing getAllBlogs Function: ', () => {
        it('Return all blogs in response', async () => {

        });

        it('Throw an error if the blogService call fails', async () => {

        });
    });

    describe('Testing getBlogById Function: ', () => {
        it('Return a blog response by id', async () => {

        });

        it('Throw an 404 error if blog id does not exits', async () => {

        });

        it('Throw an error if the blogService call fails', async () => {

        });
    });

    describe('Testing getBlogByAuthorId Function: ', () => {
        it('Return an array of blogs of a given authorId: ', async () => {

        });
        it('Throw an 404 error if author id does not exits', async () => {

        });

        it(' Throw an error if the blogService call fails', async () => {

        });
    });

    describe('Testing createBlog Function: ', () => {
        it(' create an Story and return a Story body: ', async () => {

        });

        it(' throw an error if the title and description are empty', async () => {

        });


        it(' throw an error if the blogService call fails', async () => {

        });
    });

    describe('Testing updateBlogById Function: ', () => {
        it(' update a blog by id and return updated blog response', async () => {

        });

        it(' throw an error if the both title and description are empty', async () => {

        });

        it(' throw an error if the blogService call fails', async () => {

        });
    });

    describe('Testing deleteBlogById Function: ', () => {
        it(' delete a blog by id: ', async () => {

        });

        it(' throw an error if the blogService call fails', async () => {

        });
    });

});