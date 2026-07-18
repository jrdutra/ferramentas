/**
 * Classic Swagger Petstore (Swagger 2.0) — trimmed to the most representative
 * endpoints. Shown the first time the user opens the Swagger tool.
 */
export const PETSTORE_SPEC: any = {
  swagger: '2.0',
  info: {
    title: 'Swagger Petstore',
    description:
      'This is a sample Petstore server. You can find out more about Swagger at [swagger.io](http://swagger.io).',
    version: '1.0.7',
    termsOfService: 'http://swagger.io/terms/',
    contact: { email: 'apiteam@swagger.io' },
    license: { name: 'Apache 2.0', url: 'http://www.apache.org/licenses/LICENSE-2.0.html' }
  },
  host: 'petstore.swagger.io',
  basePath: '/v2',
  schemes: ['https'],
  tags: [
    { name: 'pet', description: 'Everything about your Pets' },
    { name: 'store', description: 'Access to Petstore orders' },
    { name: 'user', description: 'Operations about user' }
  ],
  paths: {
    '/pet': {
      post: {
        tags: ['pet'],
        summary: 'Add a new pet to the store',
        operationId: 'addPet',
        consumes: ['application/json'],
        produces: ['application/json'],
        parameters: [
          {
            in: 'body',
            name: 'body',
            description: 'Pet object that needs to be added to the store',
            required: true,
            schema: { $ref: '#/definitions/Pet' }
          }
        ],
        responses: {
          '200': { description: 'successful operation', schema: { $ref: '#/definitions/Pet' } },
          '405': { description: 'Invalid input' }
        }
      },
      put: {
        tags: ['pet'],
        summary: 'Update an existing pet',
        operationId: 'updatePet',
        consumes: ['application/json'],
        produces: ['application/json'],
        parameters: [
          {
            in: 'body',
            name: 'body',
            description: 'Pet object that needs to be added to the store',
            required: true,
            schema: { $ref: '#/definitions/Pet' }
          }
        ],
        responses: {
          '200': { description: 'successful operation', schema: { $ref: '#/definitions/Pet' } },
          '400': { description: 'Invalid ID supplied' },
          '404': { description: 'Pet not found' },
          '405': { description: 'Validation exception' }
        }
      }
    },
    '/pet/findByStatus': {
      get: {
        tags: ['pet'],
        summary: 'Finds Pets by status',
        description: 'Multiple status values can be provided with comma separated strings',
        operationId: 'findPetsByStatus',
        produces: ['application/json'],
        parameters: [
          {
            name: 'status',
            in: 'query',
            description: 'Status values that need to be considered for filter',
            required: true,
            type: 'array',
            items: { type: 'string', enum: ['available', 'pending', 'sold'], default: 'available' },
            collectionFormat: 'multi'
          }
        ],
        responses: {
          '200': {
            description: 'successful operation',
            schema: { type: 'array', items: { $ref: '#/definitions/Pet' } }
          },
          '400': { description: 'Invalid status value' }
        }
      }
    },
    '/pet/{petId}': {
      get: {
        tags: ['pet'],
        summary: 'Find pet by ID',
        description: 'Returns a single pet',
        operationId: 'getPetById',
        produces: ['application/json'],
        parameters: [
          {
            name: 'petId',
            in: 'path',
            description: 'ID of pet to return',
            required: true,
            type: 'integer',
            format: 'int64'
          }
        ],
        responses: {
          '200': { description: 'successful operation', schema: { $ref: '#/definitions/Pet' } },
          '400': { description: 'Invalid ID supplied' },
          '404': { description: 'Pet not found' }
        }
      },
      delete: {
        tags: ['pet'],
        summary: 'Deletes a pet',
        operationId: 'deletePet',
        produces: ['application/json'],
        parameters: [
          { name: 'api_key', in: 'header', required: false, type: 'string' },
          {
            name: 'petId',
            in: 'path',
            description: 'Pet id to delete',
            required: true,
            type: 'integer',
            format: 'int64'
          }
        ],
        responses: {
          '400': { description: 'Invalid ID supplied' },
          '404': { description: 'Pet not found' }
        }
      }
    },
    '/store/inventory': {
      get: {
        tags: ['store'],
        summary: 'Returns pet inventories by status',
        description: 'Returns a map of status codes to quantities',
        operationId: 'getInventory',
        produces: ['application/json'],
        parameters: [],
        responses: {
          '200': {
            description: 'successful operation',
            schema: { type: 'object', additionalProperties: { type: 'integer', format: 'int32' } }
          }
        }
      }
    },
    '/store/order': {
      post: {
        tags: ['store'],
        summary: 'Place an order for a pet',
        operationId: 'placeOrder',
        consumes: ['application/json'],
        produces: ['application/json'],
        parameters: [
          {
            in: 'body',
            name: 'body',
            description: 'order placed for purchasing the pet',
            required: true,
            schema: { $ref: '#/definitions/Order' }
          }
        ],
        responses: {
          '200': { description: 'successful operation', schema: { $ref: '#/definitions/Order' } },
          '400': { description: 'Invalid Order' }
        }
      }
    },
    '/store/order/{orderId}': {
      get: {
        tags: ['store'],
        summary: 'Find purchase order by ID',
        description: 'For valid response try integer IDs with value >= 1 and <= 10.',
        operationId: 'getOrderById',
        produces: ['application/json'],
        parameters: [
          {
            name: 'orderId',
            in: 'path',
            description: 'ID of pet that needs to be fetched',
            required: true,
            type: 'integer',
            maximum: 10,
            minimum: 1,
            format: 'int64'
          }
        ],
        responses: {
          '200': { description: 'successful operation', schema: { $ref: '#/definitions/Order' } },
          '400': { description: 'Invalid ID supplied' },
          '404': { description: 'Order not found' }
        }
      }
    },
    '/user': {
      post: {
        tags: ['user'],
        summary: 'Create user',
        description: 'This can only be done by the logged in user.',
        operationId: 'createUser',
        consumes: ['application/json'],
        produces: ['application/json'],
        parameters: [
          {
            in: 'body',
            name: 'body',
            description: 'Created user object',
            required: true,
            schema: { $ref: '#/definitions/User' }
          }
        ],
        responses: { default: { description: 'successful operation' } }
      }
    },
    '/user/login': {
      get: {
        tags: ['user'],
        summary: 'Logs user into the system',
        operationId: 'loginUser',
        produces: ['application/json'],
        parameters: [
          { name: 'username', in: 'query', description: 'The user name for login', required: true, type: 'string' },
          { name: 'password', in: 'query', description: 'The password for login in clear text', required: true, type: 'string' }
        ],
        responses: {
          '200': { description: 'successful operation', schema: { type: 'string' } },
          '400': { description: 'Invalid username/password supplied' }
        }
      }
    },
    '/user/{username}': {
      get: {
        tags: ['user'],
        summary: 'Get user by user name',
        operationId: 'getUserByName',
        produces: ['application/json'],
        parameters: [
          {
            name: 'username',
            in: 'path',
            description: 'The name that needs to be fetched. Use user1 for testing.',
            required: true,
            type: 'string'
          }
        ],
        responses: {
          '200': { description: 'successful operation', schema: { $ref: '#/definitions/User' } },
          '400': { description: 'Invalid username supplied' },
          '404': { description: 'User not found' }
        }
      }
    }
  },
  definitions: {
    Category: {
      type: 'object',
      properties: {
        id: { type: 'integer', format: 'int64' },
        name: { type: 'string' }
      }
    },
    Tag: {
      type: 'object',
      properties: {
        id: { type: 'integer', format: 'int64' },
        name: { type: 'string' }
      }
    },
    Pet: {
      type: 'object',
      required: ['name', 'photoUrls'],
      properties: {
        id: { type: 'integer', format: 'int64' },
        category: { $ref: '#/definitions/Category' },
        name: { type: 'string', example: 'doggie' },
        photoUrls: { type: 'array', items: { type: 'string' } },
        tags: { type: 'array', items: { $ref: '#/definitions/Tag' } },
        status: { type: 'string', description: 'pet status in the store', enum: ['available', 'pending', 'sold'] }
      }
    },
    Order: {
      type: 'object',
      properties: {
        id: { type: 'integer', format: 'int64' },
        petId: { type: 'integer', format: 'int64' },
        quantity: { type: 'integer', format: 'int32' },
        shipDate: { type: 'string', format: 'date-time' },
        status: { type: 'string', description: 'Order Status', enum: ['placed', 'approved', 'delivered'] },
        complete: { type: 'boolean' }
      }
    },
    User: {
      type: 'object',
      properties: {
        id: { type: 'integer', format: 'int64' },
        username: { type: 'string' },
        firstName: { type: 'string' },
        lastName: { type: 'string' },
        email: { type: 'string' },
        password: { type: 'string' },
        phone: { type: 'string' },
        userStatus: { type: 'integer', format: 'int32', description: 'User Status' }
      }
    },
    ApiResponse: {
      type: 'object',
      properties: {
        code: { type: 'integer', format: 'int32' },
        type: { type: 'string' },
        message: { type: 'string' }
      }
    }
  }
};
