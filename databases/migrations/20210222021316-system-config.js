'use strict';

const tableName = 'system_configs';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { STRING, FLOAT, BOOLEAN, TEXT, INTEGER, DATE } = Sequelize;

    await queryInterface.createTable(
      tableName,
      {
        id: {
          type: INTEGER,
          primaryKey: true,
          autoIncrement: true,
          comment: 'id',
        },
        key: { type: STRING(50), allowNull: false, comment: '唯一值' },
        scope: {
          type: STRING(10),
          allowNull: false,
          comment: '范围作用域 通用 common 前端 frontEnd 后端 backEnd',
        },
        desc: {
          type: TEXT,
          allowNull: false,
          defaultValue: '',
          comment: '描述',
        },
        format: {
          type: STRING(10),
          allowNull: false,
          comment: '格式化方法 text, float, int, json, array, boolean',
        },
        rules: {
          type: Sequelize.JSON,
          allowNull: true,
          comment: '值的规则',
        },
        example: {
          type: TEXT,
          allowNull: false,
          defaultValue: '',
          comment: '案例',
        },
        text_value: {
          type: TEXT,
          allowNull: true,
          comment: '文本类型',
        },
        json_value: {
          type: Sequelize.JSON,
          allowNull: true,
          comment: 'json格式',
        },
        int_value: {
          type: INTEGER(10),
          allowNull: true,
          comment: '数字格式',
        },
        array_value: {
          type: Sequelize.JSON,
          defaultValue: '[]',
          allowNull: true,
          comment: '数组格式',
        },
        boolean_value: {
          type: BOOLEAN,
          comment: '布尔格式',
        },
        float_value: {
          type: FLOAT(10, 3),
          allowNull: true,
          comment: '浮点格式',
        },
        created_at: {
          type: DATE,
          allowNull: false,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
          comment: '创建时间',
        },
        updated_at: {
          type: DATE,
          allowNull: false,
          comment: '更新时间',
        },
        deleted_at: { type: DATE, allowNull: true, comment: '删除日期' },
        version: {
          type: INTEGER,
          defaultValue: 0,
          allowNull: false,
          comment: '更新版本',
        },
        is_deleted: {
          defaultValue: false,
          type: BOOLEAN,
          allowNull: false,
          comment: '是否删除',
        },
      },
      {
        charset: 'utf8',
        comment: '备课-系统管理表',
      },
    );

    await queryInterface.addIndex(tableName, ['key'], {
      unique: true,
      name: `idx_key`,
    });
  },

  down: async queryInterface => {
    return queryInterface.dropTable(tableName);
  },
};
