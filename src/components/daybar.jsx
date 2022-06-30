const Daybar = ({ headline, fontSize }) => {

    return <div
        style={{
            color: "rgb(17, 33, 59)",
            fontSize: fontSize,
            textAlign: "center",
            backgroundColor: "rgb(17, 236, 229)",
            borderRadiusTopLeft: 10,
            borderRadiusTopRight: 10,
        }}
    >
        { headline }
    </div>
};

export default Daybar;