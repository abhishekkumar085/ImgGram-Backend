export const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Image Gram API',
        version: '1.0.0',
        description: 'This is the Image Gram API documentation.',
      },
      servers:[
        {
            url: 'http://localhost:3000/api/v1',
        },
      ],
    },
    apis: ['./src/routers/v1/*.js'],
  };