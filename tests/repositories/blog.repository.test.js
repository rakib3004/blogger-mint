// blog repository
// blog model
// test model


describe('Testing Blog Repository: ', () => {
    describe('Testing getAllBlogs function: ', () => {
        it('Should return an array of blogs: ', async () => {
           
        });

        it('Should throw an error for database query error', async () => {
          
        });
    });

    describe('Testing getBlogById function: ', () => {
        it('Should return a blog by id: ', async () => {
           
        });

        it('Should throw an error for database query error', async () => {
            
        });
    });

    describe('Testing getBlogByAuthorId function: ', () => {
        it('Should return an array of blogs of a given authorId: ', async () => {
           
        });

        it('Should throw an error for database query error', async () => {
           
        });
    });

    describe('Testing createBlog function: ', () => {
        it('Should create an Story and return a Story body: ', async () => {
          
        });

        it('Should throw an error for database query error', async () => {

        });
    });

    describe('Testing updateBlogById function: ', () => {
        it('Should update a blog by id', async () => {
          
        });

        it('Should return 404 if the blog does not exist: ', async () => {
           
        });

        it('Should throw an error for database query error', async () => {
           
        });
    });

    describe('Testing deleteBlogById function: ', () => {
        it('Should delete a blog by id: ', async () => {
            
        });

        it('Should return 404 if the story does not exist', async () => {
          
        });

        it('Should throw an error for database query error', async () => {
           
        });
    });
});
