module.exports = {
  '/api/admin/order/{id}': {
    post: {
      tags: ['Admin Order'],
      summary: 'Admin 주문 상태 수정',
      description: 'Admin 주문 상태 수정',
      parameters: [
        {
          name: 'id',
          in: 'path',
          description: '상태 업데이트할 주문 id',
          required: true,
          schema: {
            type: 'string',
          },
        },
      ],
      requestBody: {
        content: {
          'application/json;charset=utf-8': {
            schema: {
              type: 'object',
              properties: {
                status: {
                  type: 'string',
                  description: '주문상태',
                  example: 'SHIPPING',
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: '주문 updated.',
          content: {
            'application/json': {},
          },
        },
      },
    },
    delete: {
      tags: ['Admin Order'],
      summary: 'Admin 주문 삭제',
      description: 'Admin 주문 삭제',
      parameters: [
        {
          name: 'id',
          in: 'path',
          description: '삭제할 주문 id',
          required: true,
          schema: {
            type: 'string',
          },
        },
      ],
      responses: {
        200: {
          description: '주문 삭제 완료',
          content: {
            'application/json': {},
          },
        },
      },
    },
  },
};
