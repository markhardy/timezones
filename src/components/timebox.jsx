const Timebox = ({ value, time, city}) => {

    return <div
        style={{
            borderSize: 1,
            borderStyle: "solid",
            borderColor: "rgb(17, 236, 229)",
            borderRadius: 6,
            backgroundColor: "rgb(17, 33, 59)",
            height: 100,
            color: "rgb(17, 236, 229)",
            textAlign: "center"
        }}>
        { value }
        { time }
        <br></br>
        { city }
    </div>
};

export default Timebox;