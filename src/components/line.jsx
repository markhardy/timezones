const Line = ({ color }) => {

    return <hr
        style={{
            color: color,
            backgroundColor: color,
            height: 5,
            marginTop: 100
        }}
    />
};

export default Line;