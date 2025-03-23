import React, { useEffect, useState } from 'react';
import {
  InputNumber,
  Space,
  message,
  Button,
  Card,
  Col,
  Divider,
  Form,
  Input,
  Row,
  Select,
  Typography
} from 'antd';
import {
  MinusCircleOutlined,
  PlusOutlined,
  SaveOutlined,
  ArrowLeftOutlined
} from '@ant-design/icons';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import BreadcrumbComponent from '../../../components/navigations/BreadcrumbComponent';

const { Title } = Typography;

const ingredientOptions = [
  { label: 'Đường', value: '3fa85f64-5717-4562-b3fc-2c963f66afa6' },
  { label: 'Muối', value: '1ab23c45-2345-4567-8901-abcd12345678' },
  { label: 'Bột mì', value: '9xy12abc-9999-8888-7777-abcdef987654' },
];

const UpdateRecipe = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const breadcrumbItems = [
    { title: 'Trang chủ', href: '/staff-page' },
    { title: 'Công thức', href: '/staff-page/products' },
    { title: 'Cập nhật công thức' }
  ];

  useEffect(() => {
    fetchRecipeDetail();
  }, []);

  const fetchRecipeDetail = async () => {
    try {
      const res = await axios.get(`/api/recipes/${id}`);
      if (res?.data) {
        const { recipeTitle, content, imageUrl, categoryId, ingredients } = res.data;
        form.setFieldsValue({ recipeTitle, content, imageUrl, categoryId, ingredients });
      }
    } catch (err) {
      message.error('Không thể tải dữ liệu công thức.');
    }
  };

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const payload = {
        recipeTitle: values.recipeTitle,
        content: values.content,
        categoryId: values.categoryId,
        imageUrl: values.imageUrl,
        ingredients: values.ingredients
      };
      await axios.put(`/api/recipes/${id}`, payload);
      message.success('Cập nhật công thức thành công!');
      navigate('/staff-page/products');
    } catch (error) {
      console.error(error);
      message.error('Đã xảy ra lỗi khi cập nhật công thức!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="update-recipe-container">
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
            <Title level={4} className="mb-0">Cập nhật công thức</Title>
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
                Lưu thay đổi
              </Button>
            </Space>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default UpdateRecipe;