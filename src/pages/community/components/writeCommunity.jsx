import { useRef, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import * as S from '../Styles/Community.styles';

const WriteCommunity = () => {
    const [content, setContent] = useState('');
    const quillRef = useRef(null);

    const modules = {
        toolbar: [
            [{ 'header': [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            ['link', 'image'],
            [{ 'color': [] }, { 'background': [] }],
            ['clean']
        ],
    };
    
    const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike',
        'list', 'bullet',
        'link', 'image',
        'color', 'background'
    ];

    const handleSubmit = () => {
        console.log(content);
    }

    return (
        <S.Container>
            <S.QuillContainer>
                <ReactQuill
                    ref={quillRef}
                    value={content}
                    onChange={setContent}
                    modules={modules}
                    formats={formats}
                />
            </S.QuillContainer>
            <S.FloatingButton onClick={handleSubmit}>
                작성완료
            </S.FloatingButton>
        </S.Container>
    );
};

export default WriteCommunity;