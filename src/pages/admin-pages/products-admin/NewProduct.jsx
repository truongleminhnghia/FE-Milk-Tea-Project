import React, { useEffect, useState } from "react";
import { Form, Input, InputNumber, Select, DatePicker, Switch, Button, Upload, Row, Col, Card, Divider, Space, Spin, Typography } from "antd";
import { UploadOutlined, SaveOutlined, ArrowLeftOutlined, LoadingOutlined } from "@ant-design/icons";
import BreadcrumbComponent from '../../../components/navigations/BreadcrumbComponent'
import { getByListSerivce } from '../../../services/category.service';
import ImageUploader from "../../../components/uploads/ImageUploader ";
import uploadFile from "../../../utils/upload";
import { toastConfig } from "../../../utils/utils";
import { create } from "../../../apis/product.api";
import { useNavigate, Link } from "react-router-dom";

const { Option } = Select;
const { Title, Text } = Typography;

const NewProduct = () => {
  const [form] = Form.useForm();
  const [categories, setCategories] = useState([]);
  const [fileList, setFileList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchingCategories, setFetchingCategories] = useState(false);
  const navigate = useNavigate();
  
  const breadcrumbItems = [
    { title: 'Trang chủ', href: '/admin-page' },
    { title: 'Sản phẩm', href: '/admin-page/products' },
    { title: 'Tạo mới sản phẩm' }
  ];

  const fetchCateByField = async () => {
    try {
      setFetchingCategories(true);
      const params = {
        _field: "Id,CategoryName",
        categoryStatus: "ACTIVE"
      }
      const res = await getByListSerivce(params);
      if (res?.data) {
        const formatOption = res.data.map((item) => ({
          label: item.CategoryName,
          value: item.Id
        }))
        setCategories(formatOption);
      }
    } catch (error) {
      console.error("Error: ", error);
      toastConfig("error", "Không thể tải danh mục sản phẩm");
    } finally {
      setFetchingCategories(false);
    }
  }

  useEffect(() => {
    fetchCateByField();
  }, []);

  const status = [
    { label: 'Đang hoạt động', value: 'ACTIVE' },
    { label: 'Không hoạt động', value: 'NO_ACTIVE' },
  ];

  const quantityTypes = [
    { label: 'Thùng', value: 'BIG' },
    { label: 'Bịch', value: 'BAG' },
  ];
  
  const units = [
    { label: 'Gam', value: 'Gram' },
    { label: 'Kg', value: 'Kg' }
  ];
  
  const ingredientTypes = [
    { label: 'Bột', value: 'Bot' },
    { label: 'Tra', value: 'Tra' },
    { label: 'Rắn', value: 'SOLID' },
    { label: 'Khác', value: 'OTHER' }
  ];

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      // upload all
      const uploadPromises = fileList.map((file) => uploadFile(file.originFileObj));
      const uploadedUrls = await Promise.all(uploadPromises);
      // lọc thất bại
      const imageUrls = uploadedUrls.filter((url) => url !== null);

      if (imageUrls.length === 0) {
        toastConfig("error", "Tải ảnh lên thất bại!")
        setLoading(false);
        return;
      }
      const imageRequest = imageUrls.map(url => ({ imageUrl: url }));
      const ingredientQuantities = values.ingredientQuantities?.map(iq => ({
        quantity: iq.quantity,
        productType: iq.productType
      })) || [];
      
      const ingredientRequest = {
        supplier: values.supplier,
        ingredientName: values.ingredientName,
        description: values.description,
        foodSafetyCertification: values.foodSafetyCertification,
        expiredDate: values.expiredDate,
        ingredientStatus: values.ingredientStatus || 'ACTIVE',
        weightPerBag: values.weightPerBag,
        quantityPerCarton: values.quantityPerCarton,
        ingredientType: values.ingredientType,
        unit: values.unit,
        priceOrigin: values.priceOrigin,
        categoryId: values.categoryId,
        isSale: values.isSale || false,
        imageRequest: imageRequest,
        ingredientQuantities: ingredientQuantities,
      }
      
      const res = await create(ingredientRequest);
      if (res.success) {
        toastConfig("success", "Tạo sản phẩm thành công!");
        form.resetFields();
        setFileList([]);
        navigate('/admin-page/products');
      } else {
        throw new Error(res?.message || "Tạo sản phẩm thất bại");
      }

    } catch (error) {
      console.error("Create product failed:", error);
      toastConfig("error", error.message || "Lỗi khi tạo sản phẩm!");
    } finally {
      setLoading(false);
    }
  };

  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  return (
    <div className="new-product-container">
      <BreadcrumbComponent items={breadcrumbItems} />
      
      <Card className="mt-4 shadow-sm">
        <div className="flex flex-wrap justify-between items-center mb-4">
          <div className="flex items-center">
            <Button 
              icon={<ArrowLeftOutlined />} 
              onClick={() => navigate('/admin-page/products')}
              className="mr-4"
            >
              Quay lại
            </Button>
            <Title level={4} className="mb-0">Tạo mới nguyên liệu</Title>
          </div>
        </div>
        
        <Divider />
        
        <Spin spinning={loading} indicator={antIcon}>
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            className="py-3 px-3"
            requiredMark="optional"
            initialValues={{
              ingredientStatus: 'ACTIVE',
              isSale: false
            }}
          >
            <Row gutter={24}>
              <Col xs={24} md={12}>
                <Card title="Thông tin cơ bản" className="mb-4">
                  <Form.Item 
                    label="Tên nguyên liệu" 
                    name="ingredientName" 
                    rules={[{ required: true, message: "Vui lòng nhập tên nguyên liệu!" }]}
                  >
                    <Input placeholder="Nhập tên nguyên liệu" />
                  </Form.Item>

                  <Row gutter={16}>
                    <Col xs={24} md={12}>
                      <Form.Item
                        label="Danh mục nguyên liệu"
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
                    </Col>
                    <Col xs={24} md={12}>
                      <Form.Item
                        label="Loại nguyên liệu"
                        name="ingredientType"
                        rules={[{ required: true, message: "Vui lòng chọn loại nguyên liệu" }]}
                      >
                        <Select
                          placeholder="Chọn loại nguyên liệu"
                          options={ingredientTypes}
                          allowClear
                        />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Form.Item
                    label="Số lượng trong thùng"
                    name="quantityPerCarton"
                    rules={[{ required: true, message: "Vui lòng nhập số lượng trong thùng" }]}
                  >
                    <InputNumber 
                      className="w-full" 
                      placeholder="Nhập số lượng trong thùng" 
                      min={1}
                      formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                      parser={value => value.replace(/\$\s?|(,*)/g, '')}
                    />
                  </Form.Item>

                  <Form.Item 
                    label="Ngày hết hạn" 
                    name="expiredDate" 
                    rules={[{ required: true, message: "Vui lòng chọn ngày hết hạn!" }]}
                  >
                    <DatePicker 
                      style={{ width: "100%" }}
                      format="DD/MM/YYYY"
                      placeholder="Chọn ngày hết hạn"
                    />
                  </Form.Item>

                  <Row gutter={16}>
                    <Col xs={24} md={12}>
                      <Form.Item 
                        label="Trạng thái" 
                        name="ingredientStatus"
                        rules={[{ required: true, message: "Vui lòng chọn trạng thái" }]}
                      >
                        <Select
                          placeholder="Chọn trạng thái"
                          options={status}
                        >
                          <Option value="ACTIVE">
                            <Space>
                              <span className="text-green-500">●</span>
                              Đang hoạt động
                            </Space>
                          </Option>
                          <Option value="NO_ACTIVE">
                            <Space>
                              <span className="text-red-500">●</span>
                              Không hoạt động
                            </Space>
                          </Option>
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col xs={24} md={12}>
                      <Form.Item 
                        label="Khuyến mãi" 
                        name="isSale" 
                        valuePropName="checked"
                      >
                        <Switch checkedChildren="Có" unCheckedChildren="Không" />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Form.Item 
                    label="Nhà sản xuất" 
                    name="supplier" 
                    rules={[{ required: true, message: "Vui lòng nhập nhà sản xuất!" }]}
                  >
                    <Input placeholder="Nhập tên nhà sản xuất" />
                  </Form.Item>

                  <Form.Item 
                    label="Giá gốc" 
                    name="priceOrigin" 
                    rules={[{ required: true, message: "Vui lòng nhập giá gốc!" }]}
                  >
                    <InputNumber 
                      style={{ width: "100%" }} 
                      min={0} 
                      placeholder="Nhập giá gốc"
                      formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                      parser={value => value.replace(/\$\s?|(,*)/g, '')}
                      addonAfter="VNĐ"
                    />
                  </Form.Item>
                </Card>
              </Col>
              
              <Col xs={24} md={12}>
                <Card title="Thông tin chi tiết" className="mb-4">
                  <Form.Item 
                    label="Số lượng nguyên liệu" 
                    tooltip="Thêm số lượng và loại sản phẩm"
                  >
                    <Form.List name="ingredientQuantities">
                      {(fields, { add, remove }) => (
                        <>
                          {fields.map(({ key, name, fieldKey, ...restField }) => (
                            <div key={key} className="flex flex-wrap gap-2 mb-2">
                              <Form.Item
                                {...restField}
                                name={[name, "quantity"]}
                                fieldKey={[fieldKey, "quantity"]}
                                rules={[{ required: true, message: "Nhập số lượng!" }]}
                                className="mb-1 flex-1"
                              >
                                <InputNumber 
                                  placeholder="Số lượng" 
                                  min={1} 
                                  style={{ width: '100%' }}
                                />
                              </Form.Item>
                              <Form.Item
                                {...restField}
                                name={[name, "productType"]}
                                fieldKey={[fieldKey, "productType"]}
                                rules={[{ required: true, message: "Chọn loại sản phẩm!" }]}
                                className="mb-1 flex-1"
                              >
                                <Select 
                                  placeholder="Loại sản phẩm"
                                  style={{ width: '100%' }}
                                  options={quantityTypes}
                                />
                              </Form.Item>
                              <Button 
                                danger 
                                onClick={() => remove(name)} 
                                className="flex-shrink-0"
                              >
                                Xóa
                              </Button>
                            </div>
                          ))}
                          <Button 
                            type="dashed" 
                            onClick={() => add()} 
                            className="w-full"
                            icon={<UploadOutlined />}
                          >
                            Thêm số lượng
                          </Button>
                        </>
                      )}
                    </Form.List>
                  </Form.Item>

                  <Row gutter={16}>
                    <Col xs={24} md={12}>
                      <Form.Item
                        label="Trọng lượng trên bịch"
                        name="weightPerBag"
                        rules={[{ required: true, message: "Vui lòng nhập trọng lượng" }]}
                      >
                        <InputNumber 
                          className="w-full" 
                          placeholder='Nhập trọng lượng' 
                          min={0}
                        />
                      </Form.Item>
                    </Col>
                    <Col xs={24} md={12}>
                      <Form.Item
                        label="Đơn vị"
                        name="unit"
                        rules={[{ required: true, message: "Vui lòng chọn đơn vị" }]}
                      >
                        <Select
                          placeholder="Chọn đơn vị"
                          options={units}
                        />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Form.Item 
                    label="Chứng nhận ATTP" 
                    name="foodSafetyCertification"
                    tooltip="Chứng nhận an toàn thực phẩm"
                  >
                    <Input placeholder="Nhập số chứng nhận ATTP" />
                  </Form.Item>

                  <Form.Item 
                    label="Mô tả" 
                    name="description"
                  >
                    <Input.TextArea 
                      rows={4} 
                      placeholder="Nhập mô tả chi tiết về sản phẩm"
                    />
                  </Form.Item>
                </Card>
                
                <Card title="Hình ảnh sản phẩm" className="mb-4">
                  <Form.Item 
                    tooltip="Hình ảnh sản phẩm giới hạn 5MB, định dạng JPG, PNG"
                  >
                    <ImageUploader fileList={fileList} setFileList={setFileList} />
                    <Text type="secondary" className="mt-2 block">
                      Hỗ trợ JPG, PNG. Kích thước tối đa 5MB.
                    </Text>
                  </Form.Item>
                </Card>
              </Col>
            </Row>
            
            <Divider />
            
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
        </Spin>
      </Card>
    </div>
  );
};

export default NewProduct;
