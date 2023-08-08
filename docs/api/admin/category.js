module.exports = {
  /**
   * 카테고리 List 조회 및 하위 카테고리 생성
   */
  '/api/admin/subcategory': {
    get: {
      tags: ['Admin Category'],
      summary: '카테고리 list 조회',
      description: 'Category, SubCategory 조회',
      responses: {
        200: {
          description: '모든 카테고리 조회',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    _id: {
                      type: 'string',
                      description: '카테고리 id',
                      example: '카테고리 id(sdfsdgsgse)',
                    },
                    category: {
                      type: 'string',
                      description: '카테고리 명',
                      example: '상위 카테고리',
                    },
                    subcategory: {
                      type: 'array',
                      items: {
                        type: 'object',
                        properties: {
                          _id: {
                            type: 'string',
                            description: '카테고리 id',
                            example: '카테고리 id(sdfsdgsgse)',
                          },
                          categoryId: {
                            type: 'string',
                            description: '서브 카테고리 id',
                            example: '서브 카테고리 id(sfsgsdsde12)',
                          },
                          subCategoryName: {
                            type: 'string',
                            description: '서브 카테고리 명',
                            example: '하위 카테고리 1',
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    /**
     * 하위 카테고리 생성
     */
    post: {
      tags: ['Admin Category'],
      security: [
        {
          bearerAuth: [],
        },
      ],
      summary: 'Admin 하위 카테고리 생성',
      description: 'Admin 하위 카테고리 생성',
      requestBody: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                categoryId: {
                  type: 'string',
                  description: '상위 카테고리 id',
                  example: '상위 카테고리 id(sfsdf)',
                },
                subCategoryName: {
                  type: 'string',
                  description: '하위 카테고리 명',
                  example: '사료/영양제',
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: 'SubCategory Create.',
          content: {
            'application/json': {},
          },
        },
      },
    },
  },

  /**
   * 상위 카테고리 생성
   */
  '/api/admin/category': {
    post: {
      tags: ['Admin Category'],
      security: [
        {
          bearerAuth: [],
        },
      ],
      summary: 'Admin 상위 카테고리 생성',
      description: 'Admin 상위 카테고리 생성',
      requestBody: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                _id: {
                  type: 'string',
                  description: '카테고리 id',
                  example: '카테고리 id(sfsdf)',
                },
                categoryName: {
                  type: 'string',
                  description: '카테고리 명',
                  example: '사료/영양제',
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: 'Category Create.',
          content: {
            'application/json': {},
          },
        },
      },
    },
  },
  /**
   * 상위 카테고리 수정 및 삭제
   */
  '/api/admin/category/{id}': {
    put: {
      tags: ['Admin Category'],
      summary: 'Admin 상위 카테고리 수정',
      description: 'Admin 상위 카테고리 수정',
      security: [
        {
          bearerAuth: [],
        },
      ],
      parameters: [
        {
          name: 'id',
          in: 'path',
          description: '변경할 Category id',
          required: true,
          schema: {
            type: 'string',
          },
        },
      ],
      requestBody: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                categoryName: {
                  type: 'string',
                  description: '상위 카테고리 명',
                  example: '수정 카테고리',
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: '상위 카테고리 updated',
          content: {
            'application/json': {},
          },
        },
      },
    },
    /**
     * 상위 카테고리 삭제
     */
    delete: {
      tags: ['Admin Category'],
      security: [
        {
          bearerAuth: [],
        },
      ],
      summary: 'Admin 상위 카테고리 삭제',
      description: 'Admin 상위 카테고리 삭제',
      parameters: [
        {
          name: 'id',
          in: 'path',
          description: '삭제할 상위 카테고리 id',
          required: true,
          schema: {
            type: 'string',
          },
        },
      ],
      responses: {
        200: {
          description: 'Admin 상위 카테고리 삭제 완료',
          content: {
            'application/json': {},
          },
        },
      },
    },
  },
  /**
   * 하위 카테고리 수정 및 삭제
   */
  '/api/admin/subcategory/{id}': {
    put: {
      tags: ['Admin Category'],
      summary: 'Admin 하위 카테고리 수정',
      description: 'Admin 하위 카테고리 수정',
      security: [
        {
          bearerAuth: [],
        },
      ],
      parameters: [
        {
          name: 'id',
          in: 'path',
          description: '변경할 하위 Category id',
          required: true,
          schema: {
            type: 'string',
          },
        },
      ],
      requestBody: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                subCategoryName: {
                  type: 'string',
                  description: '하위 카테고리 명',
                  example: '수정 하위 카테고리',
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: '상위 카테고리 updated',
          content: {
            'application/json': {},
          },
        },
      },
    },
    /**
     * 하위 카테고리 삭제
     */
    delete: {
      tags: ['Admin Category'],
      security: [
        {
          bearerAuth: [],
        },
      ],
      summary: 'Admin 하위 카테고리 삭제',
      description: 'Admin 하위 카테고리 삭제',
      parameters: [
        {
          name: 'id',
          in: 'path',
          description: '삭제할 하위 카테고리 id',
          required: true,
          schema: {
            type: 'string',
          },
        },
      ],
      responses: {
        200: {
          description: 'Admin 하위 카테고리 삭제 완료',
          content: {
            'application/json': {},
          },
        },
      },
    },
  },
};
