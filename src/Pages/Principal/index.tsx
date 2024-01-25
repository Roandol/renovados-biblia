import { Button, Space, Typography } from 'antd';
import * as React from 'react';
import "../../assets/css/principal.scss"
import bibleIcon from "../../assets/svg/bible.svg"
import harpaIcon from "../../assets/images/harpa.png"
import { useNavigate } from 'react-router-dom';

interface IPrincipalProps {
}

const Principal: React.FunctionComponent<IPrincipalProps> = () => {
    const navigate = useNavigate();

    const handleBiblia = () => {
        navigate("biblia");
    }
    const handleHarpas = () => {
        navigate("harpas");
    }

    return <div className="box">
        <Space size={'large'}>
            <Button className="box__button" onClick={handleBiblia}>
                <Space direction='vertical'>
                    <Typography.Text className='box__button__text'>Bíblia</Typography.Text>
                    <img width={400} height={400} src={bibleIcon} alt="Bíblia" />
                </Space>
            </Button>
            <Button className="box__button">
                <Space direction='vertical'>
                    <Typography.Text className='box__button__text' onClick={handleHarpas}>Harpas</Typography.Text>
                    <img width={350} height={350} src={harpaIcon} alt="Harpa" />
                </Space>
            </Button>
        </Space>
    </div>;
};

export default Principal;
