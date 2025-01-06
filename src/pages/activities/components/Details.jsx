import { useParams } from "react-router-dom";

const Details = () => {
    const {index} = useParams();

    return(
        <>
            <div>
                {index}
            </div>
        </>
    );
}

export default Details;