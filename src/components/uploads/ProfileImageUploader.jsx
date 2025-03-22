import React, { useState, useEffect } from "react";
import { Upload, Avatar, Modal, Button, message } from "antd";
import { UserOutlined, CameraOutlined, DeleteOutlined } from "@ant-design/icons";
import ImgCrop from "antd-img-crop";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const ProfileImageUploader = ({ currentImageUrl, fileList, setFileList }) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [imageUrl, setImageUrl] = useState(currentImageUrl || "");

  useEffect(() => {
    if (currentImageUrl) {
      setImageUrl(currentImageUrl);
    }
  }, [currentImageUrl]);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  const handleChange = async ({ fileList: newFileList }) => {
    setFileList(newFileList);
    
    // Show the image preview when a new file is selected
    if (newFileList.length > 0 && newFileList[0].originFileObj) {
      const preview = await getBase64(newFileList[0].originFileObj);
      setImageUrl(preview);
    } else if (newFileList.length === 0) {
      setImageUrl(currentImageUrl || "");
    }
  };

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('Chỉ chấp nhận định dạng JPG/PNG!');
      return Upload.LIST_IGNORE;
    }
    
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Kích thước ảnh phải nhỏ hơn 2MB!');
      return Upload.LIST_IGNORE;
    }
    
    return false; // Return false to prevent auto upload
  };

  const clearImage = () => {
    setFileList([]);
    setImageUrl(currentImageUrl || "");
  };

  return (
    <div className="profile-image-uploader">
      <div className="flex flex-col items-center">
        <div className="relative mb-3">
          <Avatar 
            size={100} 
            src={imageUrl}
            icon={!imageUrl && <UserOutlined />} 
            className="bg-[#29aae1]"
          />
          
          <div className="absolute bottom-0 right-0">
            <ImgCrop rotationSlider aspectSlider shape="round" showGrid>
              <Upload
                name="avatar"
                listType="picture-circle"
                className="avatar-uploader"
                showUploadList={false}
                fileList={fileList}
                beforeUpload={beforeUpload}
                onChange={handleChange}
                onPreview={handlePreview}
                maxCount={1}
              >
                <Button 
                  type="primary" 
                  shape="circle" 
                  size="small" 
                  icon={<CameraOutlined />}
                  className="bg-[#29aae1]"
                />
              </Upload>
            </ImgCrop>
          </div>
        </div>
        
        {fileList.length > 0 && (
          <Button 
            onClick={clearImage}
            icon={<DeleteOutlined />} 
            danger
            size="small"
            className="mt-2"
          >
            Xóa ảnh mới
          </Button>
        )}
        
        {imageUrl && fileList.length === 0 && currentImageUrl && (
          <div className="text-xs text-gray-500 mt-1">
            Ảnh hiện tại
          </div>
        )}
        
        {fileList.length > 0 && (
          <div className="text-xs text-gray-500 mt-1">
            Đã chọn ảnh mới
          </div>
        )}
      </div>

      <Modal
        open={previewOpen}
        title="Xem trước ảnh"
        footer={null}
        onCancel={() => setPreviewOpen(false)}
      >
        <img
          alt="preview"
          style={{ width: '100%' }}
          src={previewImage}
        />
      </Modal>
    </div>
  );
};

export default ProfileImageUploader; 