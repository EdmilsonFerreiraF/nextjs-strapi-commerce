const Banner = () => {
    return (
        <div className="container banner">
            <div className="banner-img">

            </div>
            <div className="legend">
            <h1 className="title">LojaTech</h1>
            <h2 className="subtitle">Equipamentos de tecnologia</h2>

            </div>
            <style jsx>
                {`
                    .banner {
                        position: relative;
                    }
                    
                    .banner-img {
                        height: 420px;
                        background-blend-mode: color;
                        background: url(https://s.zst.com.br/cms-assets/2021/02/headset-gamer-1-.jpg) #0000005e top center no-repeat;
                    }
                    
                    .legend {
                        position: absolute;
                        left: 50%;
                        top: 50%;
                        transform: translate(-50%, -50%);
                        text-align: center;
                        background: #00000085;
                        padding: 20px;
                    }

                    .title {
                        color: skyblue;
                    }

                    .subtitle {
                        color: #8ed1ed;
                    }
                `}
            </style>
        </div>
    )
}

export default Banner