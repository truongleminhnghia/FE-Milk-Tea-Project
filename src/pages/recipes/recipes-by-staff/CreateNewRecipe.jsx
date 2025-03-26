import React, { useState, useEffect } from 'react';
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
  Avatar,
} from 'antd';
import {
  MinusCircleOutlined,
  PlusOutlined,
  SaveOutlined,
  ArrowLeftOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import BreadcrumbComponent from '../../../components/navigations/BreadcrumbComponent';
import { createRecipeService } from '../../../services/recipe.service';
import { getByListSerivce as getProductList } from '../../../services/product.service';
import { getByListSerivce } from '../../../services/category.service';
import { toastConfig } from '../../../utils/utils';
import ProfileImageUploader from '../../../components/uploads/ProfileImageUploader';
import GrapesEditor from '../../../components/editor/GrapesEditor';

const { Title } = Typography;

const RECIPE_LEVELS = [
  { label: 'Public', value: 'PUBLIC' },
  { label: 'Normal', value: 'NORMAL' },
  { label: 'VIP', value: 'VIP' },
];

const BREADCRUMB_ITEMS = [
  { title: 'Trang chủ', href: '/staff-page' },
  { title: 'Công thức', href: '/staff-page/products' },
  { title: 'Tạo mới công thức' },
];

const CreateNewRecipe = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [editorContent, setEditorContent] = useState('');
  
  const [categories, setCategories] = useState([]);
  const [fetchingCategories, setFetchingCategories] = useState(false);
  
  const [ingredients, setIngredients] = useState([]);
  const [fetchingIngredients, setFetchingIngredients] = useState(false);

  useEffect(() => {
    fetchCategories();
    fetchIngredients();
  }, []);

  const fetchIngredients = async () => {
    try {
      setFetchingIngredients(true);
      const params = { status: "ACTIVE" };
      const response = await getProductList(params);
      
      if (response?.data?.data) {
        const formattedIngredients = response.data.data.map(ingredient => ({
          label: ingredient.ingredientName,
          value: ingredient.id,
          image: ingredient.images?.[0]?.imageUrl || null
        }));
        setIngredients(formattedIngredients);
      }
    } catch (error) {
      console.error("Error fetching ingredients:", error);
      toastConfig("error", "Không thể tải danh sách nguyên liệu");
    } finally {
      setFetchingIngredients(false);
    }
  };

  const fetchCategories = async () => {
    try {
      setFetchingCategories(true);
      const params = {
        _field: "Id,CategoryName",
        categoryStatus: "ACTIVE",
        categoryType: "CATEGORY_RECIPE"
      };
      const response = await getByListSerivce(params);
      
      if (response?.data) {
        const formattedCategories = response.data.map(item => ({
          label: item.CategoryName,
          value: item.Id
        }));
        setCategories(formattedCategories);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      toastConfig("error", "Không thể tải danh mục sản phẩm");
    } finally {
      setFetchingCategories(false);
    }
  };

  const handleEditorChange = (content) => {
    setEditorContent(content);
  };

  const validateForm = (values) => {
    if (fileList.length === 0) {
      message.error("Vui lòng tải lên hình ảnh công thức!");
      return false;
    }

    if (!editorContent) {
      message.error("Vui lòng nhập nội dung công thức!");
      return false;
    }

    return true;
  };

  const onFinish = async (values) => {
    if (!validateForm(values)) return;

    setLoading(true);
    try {
      const imageFile = fileList[0].originFileObj;
      // TODO: Add your Firebase image upload logic here
      // const imageUrl = await uploadImageToFirebase(imageFile);
      
      const payload = {
        recipeTitle: values.recipeTitle,
        content: editorContent,
        categoryId: values.categoryId,
        recipeLevel: values.recipeLevel,
        imageUrl: "imageUrl", // Replace with actual uploaded image URL
        ingredients: values.ingredients?.map(ing => ({
          ingredientId: ing.ingredientId,
          weightOfIngredient: ing.weightOfIngredient
        })) || [],
      };
      console.log("Payload:", payload); 
      const result = await createRecipeService(payload);

      if (result?.success) {
        message.success("Tạo công thức thành công!");
        navigate('/staff-page/products');
      } else {
        throw new Error(result?.message || "Tạo công thức thất bại");
      }
    } catch (error) {
      console.error("Error creating recipe:", error);
      message.error(error?.message || "Đã xảy ra lỗi khi tạo công thức!");
    } finally {
      setLoading(false);
    }
  };

  const renderIngredientsList = () => (
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
                  loading={fetchingIngredients}
                  options={ingredients}
                  showSearch
                  filterOption={(input, option) =>
                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                  }
                  optionRender={(option) => (
                    <Space>
                      {option.data.image && (
                        <Avatar size="small" src={option.data.image} />
                      )}
                      {option.label}
                    </Space>
                  )}
                />
              </Form.Item>

              <Form.Item
                {...restField}
                name={[name, 'weightOfIngredient']}
                rules={[{ required: true, message: 'Nhập khối lượng!' }]}
              >
                <InputNumber 
                  placeholder="Khối lượng (kg)" 
                  min={0.01} 
                  step={0.01} 
                />
              </Form.Item>

              <MinusCircleOutlined onClick={() => remove(name)} />
            </Space>
          ))}
          <Form.Item>
            <Button 
              type="dashed" 
              onClick={() => add()} 
              block 
              icon={<PlusOutlined />}
            >
              Thêm nguyên liệu
            </Button>
          </Form.Item>
        </>
      )}
    </Form.List>
  );

  return (
    <div className="new-product-container">
      <BreadcrumbComponent items={BREADCRUMB_ITEMS} />

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

        <Form 
          layout="vertical" 
          form={form} 
          onFinish={onFinish}
          initialValues={{
            recipeLevel: 'PUBLIC'
          }}
        >
          {/* Basic Information Section */}
          <Card title="Thông tin cơ bản" className="mb-4">
            <Row gutter={24}>
              <Col xs={24} md={12}>
                <Form.Item
                  label="Tên công thức"
                  name="recipeTitle"
                  rules={[{ required: true, message: "Vui lòng nhập tên công thức!" }]}
                >
                  <Input placeholder="Nhập tên công thức" />
                </Form.Item>

                <Form.Item
                  label="Hình ảnh công thức"
                  required
                  tooltip="Hình ảnh công thức sẽ được hiển thị cho người dùng"
                >
                  <ProfileImageUploader
                    currentImageUrl=""
                    fileList={fileList}
                    setFileList={setFileList}
                  />
                </Form.Item>
              </Col>
              
              <Col xs={24} md={12}>
                <Form.Item
                  label="Danh mục"
                  name="categoryId"
                  rules={[{ required: true, message: "Vui lòng chọn danh mục" }]}
                >
                  <Select
                    placeholder="Chọn danh mục"
                    options={categories}
                    loading={fetchingCategories}
                    allowClear
                    showSearch
                    filterOption={(input, option) =>
                      (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                    }
                  />
                </Form.Item>

                <Form.Item
                  label="Loại công thức"
                  name="recipeLevel"
                  rules={[{ required: true, message: "Vui lòng chọn loại công thức" }]}
                >
                  <Select
                    placeholder="Chọn loại công thức"
                    options={RECIPE_LEVELS}
                    allowClear
                    showSearch
                    filterOption={(input, option) =>
                      (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                    }
                  />
                </Form.Item>

                {renderIngredientsList()}
              </Col>
            </Row>
          </Card>

          {/* Detailed Information Section */}
          <Card title="Thông tin chi tiết" className="mb-4">
            <Form.Item
              label="Nội dung công thức"
              required
              tooltip="Sử dụng trình soạn thảo để tạo nội dung công thức"
            >
              <div style={{ border: '1px solid #d9d9d9', borderRadius: '6px', padding: '1px'}}>
                <GrapesEditor
                  value={editorContent}
                  onChange={handleEditorChange}
                />
              </div>
            </Form.Item>
          </Card>

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
                Tạo công thức
              </Button>
            </Space>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default CreateNewRecipe;
