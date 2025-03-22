import React, { useEffect, useState } from "react";
import { Form, Input, InputNumber, Select, DatePicker, Switch, Button, Upload, Row, Col, Card, Divider, Space, Spin, Typography, Modal } from "antd";
import { UploadOutlined, SaveOutlined, ArrowLeftOutlined, LoadingOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import BreadcrumbComponent from '../../../components/navigations/BreadcrumbComponent'
import { getByListSerivce } from '../../../services/category.service';
import ImageUploader from "../../../components/uploads/ImageUploader ";
import uploadFile from "../../../utils/upload";
import { formatCurrencyVND, formatISODate, toastConfig } from "../../../utils/utils";
import { getByIdService, updateByIdService } from "../../../services/product.service";
import { useNavigate, Link, useParams } from "react-router-dom";
import dayjs from 'dayjs';

const { Option } = Select;
const { Title, Text } = Typography;
const { confirm } = Modal;

const EditProduct = () => {
  const { id } = useParams();
  const [form] = Form.useForm();
  const [categories, setCategories] = useState([]);
  const [fileList, setFileList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchingCategories, setFetchingCategories] = useState(false);
  const [initialValues, setInitialValues] = useState(null);
  const [productData, setProductData] = useState(null);
  const navigate = useNavigate();
  
  const breadcrumbItems = [
    { title: 'Trang chủ', href: '/admin-page' },
    { title: 'Sản phẩm', href: '/admin-page/products' },
    { title: 'Cập nhật sản phẩm' }
  ];

  // Fetch product data
  const fetchProductData = async () => {
    try {
      setLoading(true);
      const res = await getByIdService(id);
      if (res?.success || res?.data) {
        const data = res.data;
        console.log("Product data:", data);
        
        // Format data for form
        const formData = {
          ...data,
          expiredDate: data.expiredDate ? dayjs(data.expiredDate) : null,
          // Handle different category data structures
          categoryId: data.category?.id || data.categoryId,
          // Add any other date fields that need conversion
        };
        
        setProductData(data);
        setInitialValues(formData);
        form.setFieldsValue(formData);
        
        // Set existing images to fileList
        if (data.images && data.images.length > 0) {
          const existingImages = data.images.map((image, index) => ({
            uid: image.id || `-${index}`,
            name: `image-${index}.jpg`,
            status: 'done',
            url: image.imageUrl,
            originFileObj: null, // No need to upload existing images again
            isExisting: true, // Mark as existing
            imageId: image.id
          }));
          setFileList(existingImages);
        }
      } else {
        toastConfig("error", "Không thể tải thông tin sản phẩm");
      }
    } catch (error) {
      console.error("Error fetching product:", error);
      toastConfig("error", "Đã xảy ra lỗi khi tải chi tiết sản phẩm");
    } finally {
      setLoading(false);
    }
  };

  const fetchCateByField = async () => {
    try {
      setFetchingCategories(true);
      const params = {
        _field: "Id,CategoryName",
        categoryStatus: "ACTIVE"
      }
      const res = await getByListSerivce(params);
      if (res?.data) {
        console.log("Categories data:", res.data);
        const formatOption = res.data.map((item) => ({
          label: item.CategoryName || item.categoryName,
          value: item.Id || item.id
        }));
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
    fetchProductData();
  }, [id]);

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

  // Compare values to detect changes
  const isFieldChanged = (fieldName, values) => {
    if (!initialValues) return false;
    
    // Handle special cases like dates
    if (fieldName === 'expiredDate') {
      const oldDate = initialValues.expiredDate ? initialValues.expiredDate.format('YYYY-MM-DD') : null;
      const newDate = values.expiredDate ? values.expiredDate.format('YYYY-MM-DD') : null;
      return oldDate !== newDate;
    }
    
    // Arrays need special comparison
    if (fieldName === 'ingredientQuantities') {
      // For simplicity, we'll consider them changed if length differs
      // For a more precise comparison, you'd need to compare each element
      if (!values.ingredientQuantities || !initialValues.ingredientQuantities) return true;
      if (values.ingredientQuantities.length !== initialValues.ingredientQuantities.length) return true;
      
      // More detailed comparison could be implemented here if needed
      return true; // For now, assume changed if the array exists in values
    }
    
    return initialValues[fieldName] !== values[fieldName];
  };

  // Get only changed fields
  const getChangedFields = (values) => {
    const changedValues = {};
    
    // Process regular fields
    Object.keys(values).forEach(key => {
      if (values[key] !== undefined && isFieldChanged(key, values)) {
        // Handle date conversion for API
        if (key === 'expiredDate' && values[key]) {
          changedValues[key] = values[key].format('YYYY-MM-DD');
        } else {
          changedValues[key] = values[key];
        }
      }
    });
    
    return changedValues;
  };

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      
      // Get only changed fields
      const changedValues = getChangedFields(values);
      
      // If no fields changed, show info toast and return
      if (Object.keys(changedValues).length === 0 && fileList.every(file => file.isExisting)) {
        toastConfig("info", "Không có thay đổi nào để cập nhật");
        setLoading(false);
        return;
      }
      
      // Handle image uploads for new images
      let imageRequest = [];
      const existingImages = fileList.filter(file => file.isExisting).map(file => ({ 
        id: file.imageId,
        imageUrl: file.url 
      }));
      
      const newImages = fileList.filter(file => !file.isExisting);
      if (newImages.length > 0) {
        const uploadPromises = newImages.map((file) => uploadFile(file.originFileObj));
        const uploadedUrls = await Promise.all(uploadPromises);
        const newImageUrls = uploadedUrls.filter(url => url !== null);
        const formattedNewImages = newImageUrls.map(url => ({ imageUrl: url }));
        
        imageRequest = [...existingImages, ...formattedNewImages];
      } else {
        imageRequest = existingImages;
      }
      
      // Format ingredient quantities if changed
      let ingredientQuantities = undefined;
      if (changedValues.ingredientQuantities) {
        ingredientQuantities = changedValues.ingredientQuantities.map(iq => ({
          quantity: iq.quantity,
          productType: iq.productType,
          // Include ID if available
          ...(iq.id && { id: iq.id })
        }));
      }
      
      // Prepare update request
      const updateRequest = {
        ...changedValues,
        // Always include ID in the request
        // id: id,
        // Include imageRequest if there are any images
        ...(imageRequest.length > 0 && { imageRequest }),
        // Include ingredientQuantities if changed
        ...(ingredientQuantities && { ingredientQuantities })
      };
      
      // Show confirmation dialog
      confirm({
        title: 'Xác nhận cập nhật',
        icon: <ExclamationCircleOutlined />,
        content: 'Bạn có chắc chắn muốn cập nhật sản phẩm này?',
        okText: 'Xác nhận',
        cancelText: 'Hủy',
        onOk: async () => {
          try {
            const res = await updateByIdService(id, updateRequest);
            console.log("reupdateRequests", updateRequest);
            if (res?.success || res?.data || res?.code === 200) {
              toastConfig("success", "Cập nhật sản phẩm thành công!");
              // Refresh data after update
              fetchProductData();
            } else {
              throw new Error(res?.message || "Cập nhật sản phẩm thất bại");
            }
          } catch (error) {
            console.error("Update product failed:", error);
            toastConfig("error", error.message || "Lỗi khi cập nhật sản phẩm!");
          } finally {
            setLoading(false);
          }
        },
        onCancel() {
          setLoading(false);
        },
      });
    } catch (error) {
      console.error("Update process failed:", error);
      toastConfig("error", "Lỗi trong quá trình cập nhật sản phẩm!");
      setLoading(false);
    }
  };

  const handleCancel = () => {
    confirm({
      title: 'Hủy thay đổi',
      icon: <ExclamationCircleOutlined />,
      content: 'Bạn có chắc chắn muốn hủy các thay đổi?',
      okText: 'Có',
      cancelText: 'Không',
      onOk() {
        navigate('/staff-page/products');
      },
    });
  };

  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  if (!initialValues) {
    return (
      <div className="edit-product-container">
        <BreadcrumbComponent items={breadcrumbItems} />
        <div className="flex justify-center items-center h-[300px]">
          <Spin indicator={antIcon} tip="Đang tải thông tin sản phẩm..." />
        </div>
      </div>
    );
  }

  return (
    <div className="edit-product-container">
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
            <Title level={4} className="mb-0">Cập nhật nguyên liệu: {productData?.ingredientName}</Title>
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
            initialValues={initialValues}
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
                  onClick={handleCancel}
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
                  Cập nhật sản phẩm
                </Button>
              </Space>
            </div>
          </Form>
        </Spin>
      </Card>
    </div>
  );
};

export default EditProduct; 