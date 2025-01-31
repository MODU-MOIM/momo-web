// import styled from "styled-components";
// import initialBannerImage from "../../../assets/initialBannerImage.jpg"
// import { useEffect, useRef, useState } from "react";
// import { crewAPI } from "../../../api";


// export default function BannerImageInput(){
//     const [bannerImage, setBannerImage] = useState(initialBannerImage);
//     const fileInputRef = useRef(null);

//     useEffect(()=>{
//         if(bannerImage){
//             setBannerImage(bannerImage||'');
//         }
//     },[bannerImage])

//     const handleImageClick = ()=>{
//         fileInputRef.current?.click();
//     }
//     const handleProfileImageChange = (e) => {
//         const file = e.target.files[0];
//         handleImageUpload(file);
//     };
//     const handleImageUpload = async(file)=>{
//         if (!file) return;
//         if (!file.type.startsWith('image/')){
//             alert('이미지 파일만 업로드 가능합니다.');
//             return;
//         }
//         try {
//             const response = await crewAPI.uploadImage(formData);
//             const imageUrl = response.data.data;
//             setBannerImage(imageUrl);
//             alert('배너 이미지 업로드 성공');
//         } catch (error) {
//             console.error('배너 이미지 업로드 실패: ',error);
//             alert('배너 이미지 업로드 실패');
//         }
//     }
//     return(
//         <Wrapper>
//                 <input
//                     type="file"
//                     ref={fileInputRef}
//                     onChange={handleProfileImageChange}
//                     accept="image/*"
//                     style={{ display: 'none' }}
//                 />
//                 <BannerImage
//                     onClick={handleImageClick}
//                     style={{ backgroundImage: `url(${bannerImage})`}}
//                 >
//                 </BannerImage>
//         </Wrapper>
//     );
// }

// const Wrapper = styled.div`
//     width: 80%;
//     height: 100px;
//     border: 1px solid red;
//     margin-bottom: 50px;
// `;
// const BannerImage = styled.div`
//     width: 100%;
//     height: 100%;
//     border: 1px solid blue;
//     background-size: cover;
//     background-position: center;
//     position: relative;

//     &:hover::after {
//         content: '이미지 변경';
//         position: absolute;
//         top: 50%;
//         left: 50%;
//         transform: translate(-50%, -50%);
//         background-color: rgba(0, 0, 0, 0.5);
//         color: white;
//         padding: 30px;
//         border-radius: 4px;
//         font-size: 12px;
//     }
// `;