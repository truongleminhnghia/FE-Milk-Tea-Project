import React, { useState } from 'react';
import {
  InputNumber,
  Space,
  Button,
  Card,
  Col,
  Divider,
  Form,
  Input,
  Row,
  Select,
  Typography,
  message,
} from 'antd';
import { MinusCircleOutlined, PlusOutlined, SaveOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import BreadcrumbComponent from '../../../components/navigations/BreadcrumbComponent';
import { createRecipeService } from '../../../services/recipe.service'; // Import the service

const { Title } = Typography;

const ingredientOptions = [
  { label: 'Đường', value: '3fa85f64-5717-4562-b3fc-2c963f66afa6' },
  { label: 'Muối', value: '1ab23c45-2345-4567-8901-abcd12345678' },
  { label: 'Bột mì', value: '9xy12abc-9999-8888-7777-abcdef987654' },
];

const CreateNewRecipe = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const breadcrumbItems = [
    { title: 'Trang chủ', href: '/staff-page' },
    { title: 'Công thức', href: '/staff-page/products' },
    { title: 'Tạo mới công thức' },
  ];

  const onFinish = async (values) => {
    setLoading(true);
    try {
      // Prepare payload for the API request
      const payload = {
        recipeTitle: values.recipeTitle,
        content: values.content,
        categoryId: values.categoryId,
        imageUrl: values.imageUrl,
        ingredients: values.ingredients,
      };

      // Use the service function to create the recipe
      const result = await createRecipeService(payload);
      
      if (result.success) {
        message.success("Tạo công thức thành công!");
        navigate('/staff-page/products');
      } else {
        message.error(result.message || "Đã xảy ra lỗi khi tạo công thức!");
      }
    } catch (error) {
      console.error(error);
      message.error("Đã xảy ra lỗi khi tạo công thức!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="new-product-container">
      <BreadcrumbComponent items={breadcrumbItems} />

      <Card className="mt-4 shadow-sm">
        <div className="flex flex-wrap justify-between items-center mb-4">
          <div className="flex items-center">
            <Button
              icon={<ArrowLeftOutlined />}
              onClick={() => navigate('/staff-page/products')}
              className="mr-4"
            >
              Quay lại
            </Button>
            <Title level={4} className="mb-0">Tạo mới công thức</Title>
          </div>
        </div>
        <Divider />

        <Form layout="vertical" form={form} onFinish={onFinish}>
          <Row gutter={24}>
            <Col xs={24} md={12}>
              <Card title="Thông tin cơ bản" className="mb-4">
                <Form.Item
                  label="Tên công thức"
                  name="recipeTitle"
                  rules={[{ required: true, message: "Vui lòng nhập tên công thức!" }]}
                >
                  <Input placeholder="Nhập tên công thức" />
                </Form.Item>

                <Form.Item
                  label="URL Hình ảnh"
                  name="imageUrl"
                  rules={[{ required: true, message: "Vui lòng nhập đường dẫn hình ảnh!" }]}
                >
                  <Input placeholder="Nhập URL hình ảnh" />
                </Form.Item>

                <Form.Item
                  label="Danh mục"
                  name="categoryId"
                  rules={[{ required: true, message: "Vui lòng nhập danh mục!" }]}
                >
                  <Input placeholder="Nhập ID danh mục" />
                </Form.Item>

                <Form.List name="ingredients">
                  {(fields, { add, remove }) => (
                    <>
                      {fields.map(({ key, name, ...restField }) => (
                        <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                          <Form.Item
                            {...restField}
                            name={[name, 'ingredientId']}
                            rules={[{ required: true, message: 'Chọn nguyên liệu!' }]}
                          >
                            <Select
                              placeholder="Chọn nguyên liệu"
                              style={{ width: 200 }}
                              options={ingredientOptions}
                            />
                          </Form.Item>

                          <Form.Item
                            {...restField}
                            name={[name, 'weightOfIngredient']}
                            rules={[{ required: true, message: 'Nhập khối lượng!' }]}
                          >
                            <InputNumber placeholder="Khối lượng (kg)" min={0.01} step={0.01} />
                          </Form.Item>

                          <MinusCircleOutlined onClick={() => remove(name)} />
                        </Space>
                      ))}
                      <Form.Item>
                        <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                          Thêm nguyên liệu
                        </Button>
                      </Form.Item>
                    </>
                  )}
                </Form.List>
              </Card>
            </Col>

            <Col xs={24} md={12}>
              <Card title="Thông tin chi tiết" className="mb-4">
                <Form.Item
                  label="Nội dung"
                  name="content"
                >
                  <Input.TextArea
                    rows={4}
                    placeholder="Nhập mô tả chi tiết về công thức"
                  />
                </Form.Item>
              </Card>
            </Col>
          </Row>

          <div className="flex justify-end">
            <Space>
              <Button
                onClick={() => navigate('/staff-page/products')}
                disabled={loading}
              >
                Hủy
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                icon={<SaveOutlined />}
                className="bg-[#29aae1]"
              >
                Tạo sản phẩm
              </Button>
            </Space>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default CreateNewRecipe;
