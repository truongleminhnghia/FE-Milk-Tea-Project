import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getByIdService } from '../../../services/user.service';
import { 
  Button, Card, Col, Descriptions, Divider, Row, Skeleton, 
  Space, Tag, Typography, Avatar, notification, Form, Input, 
  Select, Tabs, Upload, message
} from 'antd';
import BreadcrumbComponent from '../../../components/navigations/BreadcrumbComponent';
import { 
  ArrowLeftOutlined, EditOutlined, UserOutlined, 
  SaveOutlined, CloseOutlined, MailOutlined, 
  PhoneOutlined, LockOutlined, IdcardOutlined,
  HomeOutlined, TagOutlined, UploadOutlined
} from '@ant-design/icons';
import { formatISODate } from '../../../utils/utils';
import ProfileImageUploader from '../../../components/uploads/ProfileImageUploader';
import uploadFile from "../../../utils/upload";

const { Title, Text } = Typography;
const { TabPane } = Tabs;
const { TextArea } = Input;

const AccountDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [account, setAccount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    const fetchAccountDetail = async () => {
      try {
        setLoading(true);
        const response = await getByIdService(id);
        if (response?.success && response?.data) {
          setAccount(response.data);
          
          // Initialize form values
          form.setFieldsValue({
            firstName: response.data.firstName,
            lastName: response.data.lastName,
            phoneNumber: response.data.phone || '',
            ...(response.data.customer && {
              taxCode: response.data.customer.taxCode || '',
              address: response.data.customer.address || '',
            }),
            ...(response.data.employee && {
              refCode: response.data.employee.refCode || '',
            }),
          });

          // Set image URL if exists
          if (response.data.imageUrl) {
            setImageUrl(response.data.imageUrl);
          }

        } else {
          notification.error({
            message: 'Lỗi',
            description: 'Không thể tải thông tin tài khoản',
          });
        }
      } catch (error) {
        console.error('Error fetching account:', error);
        notification.error({
          message: 'Lỗi',
          description: error.message || 'Đã xảy ra lỗi khi tải thông tin tài khoản',
        });
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchAccountDetail();
    }
  }, [id, form]);

  const handleBack = () => {
    navigate('/admin-page/accounts');
  };

  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
    if (!isEditMode) {
      // Reset form data when switching to edit mode
      form.setFieldsValue({
        firstName: account.firstName,
        lastName: account.lastName,
        phoneNumber: account.phone || '',
        password: '',
        ...(account.customer && {
          taxCode: account.customer.taxCode || '',
          address: account.customer.address || '',
        }),
        ...(account.employee && {
          refCode: account.employee.refCode || '',
        }),
      });
    }
  };

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('Bạn chỉ có thể tải lên file JPG/PNG!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Ảnh phải nhỏ hơn 2MB!');
    }
    return isJpgOrPng && isLt2M;
  };

  const handleUploadChange = (info) => {
    if (info.file.status === 'uploading') {
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world
      getBase64(info.file.originFileObj, (url) => {
        setImageUrl(url);
      });
    }
  };

  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  const validatePassword = (_, value) => {
    if (value && value.length < 6) {
      return Promise.reject('Mật khẩu phải có ít nhất 6 ký tự');
    }
    return Promise.resolve();
  };

  const handleSubmit = async (values) => {
    setSubmitting(true);
    try {
      let uploadedImageUrl = imageUrl;
      
      // Upload image if fileList has items
      if (fileList.length > 0) {
        try {
          const imageResult = await uploadFile(fileList[0].originFileObj);
          if (imageResult?.data?.url) {
            uploadedImageUrl = imageResult.data.url;
            setImageUrl(uploadedImageUrl);
          }
        } catch (uploadError) {
          console.error("Image upload error:", uploadError);
          notification.warning({
            message: 'Cảnh báo',
            description: 'Lỗi khi tải ảnh lên, thông tin khác vẫn sẽ được cập nhật',
          });
        }
      }
      
      const updateData = {
        firstName: values.firstName,
        lastName: values.lastName,
        phoneNumber: values.phoneNumber,
        imgUrl: uploadedImageUrl || undefined,
      };

      // Add customer or employee data if it exists in the account
      if (account.customer) {
        updateData.customer = {
          taxCode: values.taxCode || '',
          address: values.address || ''
        };
      }

      if (account.employee) {
        updateData.employee = {
          refCode: values.refCode || ''
        };
      }

      console.log('Update data:', updateData);
      
      // Mock API call for update
      setTimeout(() => {
        notification.success({
          message: 'Thành công',
          description: 'Cập nhật tài khoản thành công!',
        });
        
        // Update local state to reflect changes
        setAccount(prev => ({
          ...prev,
          firstName: values.firstName,
          lastName: values.lastName,
          phone: values.phoneNumber,
          imageUrl: uploadedImageUrl,
          customer: prev.customer ? {
            ...prev.customer,
            taxCode: values.taxCode || '',
            address: values.address || '',
          } : null,
          employee: prev.employee ? {
            ...prev.employee,
            refCode: values.refCode || '',
          } : null,
        }));
        
        setIsEditMode(false);
        setSubmitting(false);
      }, 1000);
      
    } catch (error) {
      console.error('Update failed:', error);
      notification.error({
        message: 'Lỗi',
        description: error.message || 'Đã xảy ra lỗi khi cập nhật tài khoản',
      });
      setSubmitting(false);
    }
  };

  const getRoleLabel = (roleName) => {
    switch(roleName) {
      case 'ROLE_ADMIN':
        return { color: 'purple', text: 'Quản trị viên' };
      case 'ROLE_STAFF':
        return { color: 'blue', text: 'Nhân viên' };
      case 'ROLE_CUSTOMER':
        return { color: 'green', text: 'Khách hàng' };
      case 'ROLE_MANAGER':
        return { color: 'red', text: 'Quản lý' };
      default:
        return { color: 'default', text: roleName };
    }
  };

  const getStatusLabel = (status) => {
    switch(status) {
      case 'ACTIVE':
        return { color: 'success', text: 'Đang hoạt động' };
      case 'NO_ACTIVE':
        return { color: 'error', text: 'Không hoạt động' };
      default:
        return { color: 'default', text: 'Không xác định' };
    }
  };

  const getAccountLevelLabel = (level) => {
    switch(level) {
      case 'NORMAL':
        return { color: 'blue', text: 'Thông thường' };
      case 'VIP':
        return { color: 'gold', text: 'VIP' };
      case 'PREMIUM':
        return { color: 'purple', text: 'Premium' };
      default:
        return { color: 'default', text: level || 'Không xác định' };
    }
  };

  const uploadButton = (
    <div>
      <UploadOutlined />
      <div className="mt-2">Tải ảnh lên</div>
    </div>
  );

  const breadcrumbItems = [
    { title: 'Trang chủ', href: '/admin-page' },
    { title: 'Tài khoản', href: '/admin-page/accounts' },
    { title: 'Chi tiết tài khoản' }
  ];

  if (loading) {
    return (
      <div className="account-detail-container">
        <BreadcrumbComponent items={breadcrumbItems} />
        <Card className="mt-4 shadow-sm">
          <Skeleton active avatar paragraph={{ rows: 10 }} />
        </Card>
      </div>
    );
  }

  if (!account) {
    return (
      <div className="account-detail-container">
        <BreadcrumbComponent items={breadcrumbItems} />
        <Card className="mt-4 shadow-sm">
          <div className="text-center py-8">
            <Title level={4}>Không tìm thấy thông tin tài khoản</Title>
            <Button 
              type="primary" 
              icon={<ArrowLeftOutlined />} 
              onClick={handleBack}
              className="mt-4 bg-[#29aae1]"
            >
              Quay lại danh sách
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  const role = getRoleLabel(account.roleName);
  const status = getStatusLabel(account.accountStatus);

  return (
    <div className="account-detail-container">
      <BreadcrumbComponent items={breadcrumbItems} />
      
      <Card className="mt-4 shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <Button 
              icon={<ArrowLeftOutlined />} 
              onClick={handleBack}
              className="mr-4"
            >
              Quay lại
            </Button>
            <Title level={4} className="m-0">
              {isEditMode ? 'Chỉnh sửa tài khoản' : 'Chi tiết tài khoản'}
            </Title>
          </div>
          {isEditMode ? (
            <Space>
              <Button 
                icon={<CloseOutlined />} 
                onClick={toggleEditMode}
              >
                Hủy
              </Button>
              <Button 
                type="primary" 
                icon={<SaveOutlined />} 
                onClick={() => form.submit()}
                loading={submitting}
                className="bg-[#29aae1]"
              >
                Lưu thay đổi
              </Button>
            </Space>
          ) : (
            <Button 
              type="primary" 
              icon={<EditOutlined />} 
              onClick={toggleEditMode}
              className="bg-[#29aae1]"
            >
              Chỉnh sửa
            </Button>
          )}
        </div>

        {isEditMode ? (
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            className="account-edit-form"
            requiredMark={false}
          >
            <Row gutter={24}>
              <Col xs={24} md={8}>
                <Card className="text-center shadow-sm mb-4">
                  <div className="mb-4">
                    <ProfileImageUploader
                      currentImageUrl={imageUrl}
                      fileList={fileList}
                      setFileList={setFileList}
                    />
                  </div>
                  <Title level={4} className="m-0">
                    {account.firstName} {account.lastName}
                  </Title>
                  <div className="my-2">
                    <Tag color={role.color}>{role.text}</Tag>
                    <Tag color={status.color}>{status.text}</Tag>
                  </div>
                  <Text type="secondary">{account.email}</Text>
                </Card>
              </Col>
              
              <Col xs={24} md={16}>
                <Tabs defaultActiveKey="basic" className="shadow-sm">
                  <TabPane tab="Thông tin cơ bản" key="basic">
                    <div className="p-4">
                      <Row gutter={16}>
                        <Col span={12}>
                          <Form.Item 
                            name="lastName" 
                            label="Họ"
                            rules={[{ required: true, message: 'Vui lòng nhập họ' }]}
                          >
                            <Input 
                              prefix={<UserOutlined className="site-form-item-icon" />} 
                              placeholder="Nhập họ"
                            />
                          </Form.Item>
                        </Col>
                        <Col span={12}>
                          <Form.Item 
                            name="firstName" 
                            label="Tên"
                            rules={[{ required: true, message: 'Vui lòng nhập tên' }]}
                          >
                            <Input 
                              prefix={<UserOutlined className="site-form-item-icon" />} 
                              placeholder="Nhập tên"
                            />
                          </Form.Item>
                        </Col>
                      </Row>
                  
                      <Form.Item 
                        label="Email"
                      >
                        <Input 
                          prefix={<MailOutlined className="site-form-item-icon" />} 
                          placeholder="Email"
                          value={account.email}
                          disabled
                        />
                      </Form.Item>

                      <Form.Item 
                        name="phoneNumber" 
                        label="Số điện thoại"
                      >
                        <Input 
                          prefix={<PhoneOutlined className="site-form-item-icon" />} 
                          placeholder="Nhập số điện thoại"
                        />
                      </Form.Item>
                    </div>
                  </TabPane>

                  {account.customer && (
                    <TabPane tab="Thông tin khách hàng" key="customer">
                      <div className="p-4">
                        <Form.Item 
                          name="taxCode" 
                          label="Mã số thuế"
                        >
                          <Input 
                            prefix={<IdcardOutlined className="site-form-item-icon" />} 
                            placeholder="Nhập mã số thuế"
                          />
                        </Form.Item>

                        <Form.Item 
                          name="address" 
                          label="Địa chỉ"
                        >
                          <TextArea 
                            placeholder="Nhập địa chỉ"
                            autoSize={{ minRows: 3, maxRows: 5 }}
                          />
                        </Form.Item>

                        <div className="mt-2">
                          <Text type="secondary">
                            Trạng thái mua hàng: 
                            <Tag className="ml-2" color={account.customer.purchased ? 'green' : 'orange'}>
                              {account.customer.purchased ? 'Đã mua hàng' : 'Chưa mua hàng'}
                            </Tag>
                          </Text>
                        </div>
                      </div>
                    </TabPane>
                  )}

                  {account.employee && (
                    <TabPane tab="Thông tin nhân viên" key="employee">
                      <div className="p-4">
                        <Form.Item 
                          name="refCode" 
                          label="Mã tham chiếu"
                        >
                          <Input 
                            prefix={<IdcardOutlined className="site-form-item-icon" />} 
                            placeholder="Nhập mã tham chiếu"
                          />
                        </Form.Item>
                      </div>
                    </TabPane>
                  )}
                </Tabs>
              </Col>
            </Row>
          </Form>
        ) : (
          <Row gutter={24}>
            <Col xs={24} md={8}>
              <Card className="text-center shadow-sm">
                <div className="mb-4">
                  <Avatar 
                    size={96} 
                    icon={<UserOutlined />} 
                    src={account.imageUrl || imageUrl} 
                    className="bg-[#29aae1]"
                  />
                </div>
                <Title level={4} className="m-0">
                  {account.firstName} {account.lastName}
                </Title>
                <div className="my-2">
                  <Tag color={role.color}>{role.text}</Tag>
                  <Tag color={status.color}>{status.text}</Tag>
                </div>
                <Text type="secondary">{account.email}</Text>
                {account.phone && (
                  <p className="mt-1">{account.phone || 'Chưa cập nhật số điện thoại'}</p>
                )}
              </Card>
            </Col>
            
            <Col xs={24} md={16}>
              <Card className="shadow-sm">
                <Descriptions 
                  title="Thông tin tài khoản" 
                  bordered 
                  column={{ xs: 1, sm: 2 }}
                  className="mb-4"
                >
                  <Descriptions.Item label="Email">{account.email}</Descriptions.Item>
                  <Descriptions.Item label="Họ">{account.lastName}</Descriptions.Item>
                  <Descriptions.Item label="Tên">{account.firstName}</Descriptions.Item>
                  <Descriptions.Item label="Số điện thoại">
                    {account.phone || 'Chưa cập nhật'}
                  </Descriptions.Item>
                  <Descriptions.Item label="Vai trò">
                    <Tag color={role.color}>{role.text}</Tag>
                  </Descriptions.Item>
                  <Descriptions.Item label="Trạng thái">
                    <Tag color={status.color}>{status.text}</Tag>
                  </Descriptions.Item>
                  <Descriptions.Item label="Ngày tạo">
                    {account.createAt ? formatISODate(account.createAt) : 'Không có thông tin'}
                  </Descriptions.Item>
                  <Descriptions.Item label="Ngày cập nhật">
                    {account.updateAt ? formatISODate(account.updateAt) : 'Không có thông tin'}
                  </Descriptions.Item>
                </Descriptions>

                {account.customer && (
                  <>
                    <Divider />
                    <Descriptions 
                      title="Thông tin khách hàng" 
                      bordered 
                      column={{ xs: 1, sm: 2 }}
                    >
                      <Descriptions.Item label="ID Khách hàng">{account.customer.id}</Descriptions.Item>
                      <Descriptions.Item label="Mã số thuế">
                        {account.customer.taxCode || 'Chưa cập nhật'}
                      </Descriptions.Item>
                      <Descriptions.Item label="Địa chỉ">
                        {account.customer.address || 'Chưa cập nhật'}
                      </Descriptions.Item>
                      <Descriptions.Item label="Cấp độ tài khoản">
                        <Tag color={getAccountLevelLabel(account.customer.accountLevel).color}>
                          {getAccountLevelLabel(account.customer.accountLevel).text}
                        </Tag>
                      </Descriptions.Item>
                      <Descriptions.Item label="Đã mua hàng">
                        <Tag color={account.customer.purchased ? 'green' : 'orange'}>
                          {account.customer.purchased ? 'Đã mua hàng' : 'Chưa mua hàng'}
                        </Tag>
                      </Descriptions.Item>
                    </Descriptions>
                  </>
                )}

                {account.employee && (
                  <>
                    <Divider />
                    <Descriptions 
                      title="Thông tin nhân viên" 
                      bordered 
                      column={{ xs: 1, sm: 2 }}
                    >
                      <Descriptions.Item label="ID Nhân viên">{account.employee.id}</Descriptions.Item>
                      <Descriptions.Item label="Mã tham chiếu">
                        {account.employee.refCode || 'Chưa cập nhật'}
                      </Descriptions.Item>
                      {Object.entries(account.employee).map(([key, value]) => {
                        if (key !== 'id' && key !== 'refCode') {
                          return (
                            <Descriptions.Item label={key} key={key}>
                              {value || 'Chưa cập nhật'}
                            </Descriptions.Item>
                          );
                        }
                        return null;
                      })}
                    </Descriptions>
                  </>
                )}
              </Card>
            </Col>
          </Row>
        )}
      </Card>
    </div>
  );
};

export default AccountDetail; 