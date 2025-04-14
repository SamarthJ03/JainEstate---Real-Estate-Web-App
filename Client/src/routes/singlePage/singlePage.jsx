import Slider from "../../components/slider/Slider";
import "./singlePage.scss";
import { useLoaderData, useNavigate } from "react-router-dom";
import DOMPurify from "dompurify";
import { useContext, useState } from "react";
import apiRequest from "../../lib/apiRequest";
import { AuthContext } from "../../context/AuthContext";
import Map from "../../components/map/Map";

function SinglePage() {
    const post = useLoaderData() || {};

    if (!post.images || post.images.length === 0) {
        post.images = ["/noavatar.jpg"];
    }
    
    if (!post.user.avatar) {
        post.user.avatar = "/noavatar.jpg";
    }
   

    const [saved, setSaved] = useState(post.isSaved ?? false);
    const { currentUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSave = async () => {


        if (!currentUser) {
            navigate("/login");
        }

        setSaved((prev) => !prev);
        try {
            await apiRequest.post("/users/save", { postId: post.id });
        } catch (err) {
            console.log(err);
            setSaved((prev) => !prev);
        }
    };

    return (
        <div className="singlePage">
            <div className="details">
                <div className="wrapper">
                    <Slider images={post.images} />
                    <div className="info">
                        <div className="top">
                            <div className="post">
                                <h1>{post.title ?? ""}</h1>
                                <div className="address">
                                    <img src="./pin.png" alt="" />
                                    <span>{post.address ?? ""}</span>
                                </div>
                                <div className="price">$ {post.price ?? ""}</div>
                            </div>
                            <div className="user">
                                <img src={post.user.avatar} alt="" />
                                <span>{post.user.username ?? ""}</span>
                            </div>
                        </div>
                        <div
                            className="bottom"
                            dangerouslySetInnerHTML={{
                                __html: DOMPurify.sanitize(post?.postDetail?.desc ?? ""),
                            }}
                        ></div>
                    </div>
                </div>
            </div>
            <div className="features">
                <div className="wrapper">
                    <p className="title">General</p>
                    <div className="listVertical">
                        <div className="feature">
                            <img src="./utility.png" alt="" />
                            <div className="featureText">
                                <span>Utilities</span>
                                <p>
                                    {[
                                        "owner",
                                        "tenant",
                                        "shared",
                                    ].includes(post?.postDetail?.utilities)
                                        ? post.postDetail.utilities === "owner"
                                            ? "Owner is responsible"
                                            : post.postDetail.utilities === "tenant"
                                            ? "Tenant is responsible"
                                            : "Shared"
                                        : "Not specified"}
                                </p>
                            </div>
                        </div>
                        <div className="feature">
                            <img src="./pet.png" alt="" />
                            <div className="featureText">
                                <span>Pet policy</span>
                                <p>
                                    {[
                                        "allowed",
                                        "not-allowed",
                                    ].includes(post?.postDetail?.pet)
                                        ? post.postDetail.pet === "allowed"
                                            ? "Pets Allowed"
                                            : "Pets Not Allowed"
                                        : "Not specified"}
                                </p>
                            </div>
                        </div>
                        <div className="feature">
                            <img src="./fee.png" alt="" />
                            <div className="featureText">
                                <span>Income Policy</span>
                                <p>{post?.postDetail?.income ?? "Not specified"}</p>
                            </div>
                        </div>
                    </div>
                    <p className="title">Sizes</p>
                    <div className="sizes">
                        <div className="size">
                            <img src="./size.png" alt="" />
                            <span>{post?.postDetail?.size ?? ""}</span>
                        </div>
                        <div className="size">
                            <img src="./bed.png" alt="" />
                            <span>{post?.bedroom ?? ""}</span>
                        </div>
                        <div className="size">
                            <img src="./bath.png" alt="" />
                            <span>{post?.bathroom ?? ""}</span>
                        </div>
                    </div>
                    <p className="title">Nearby Places</p>
                    <div className="listHorizontal">
                        <div className="feature">
                            <img src="./school.png" alt="" />
                            <div className="featureText">
                                <span>School</span>
                                <p>
                                    {post?.postDetail?.school
                                        ? post.postDetail.school > 999
                                            ? post.postDetail.school / 1000 + "km"
                                            : post.postDetail.school + "m"
                                        : "Not specified"}{" "}away
                                </p>
                            </div>
                        </div>
                        <div className="feature">
                            <img src="./bus.png" alt="" />
                            <div className="featureText">
                                <span>Bus Stop</span>
                                <p>
                                    {post?.postDetail?.bus
                                        ? post.postDetail.bus > 999
                                            ? post.postDetail.bus / 1000 + "km"
                                            : post.postDetail.bus + "m"
                                        : "Not specified"}{" "}away
                                </p>
                            </div>
                        </div>
                    </div>
                    <p className="title">Location</p>
                    <div className="mapContainer">
                        <Map items={[post]} />
                    </div>
                    <div className="buttons">
                        <button>
                            <img src="/chat.png" alt="" />
                            Send a Message
                        </button>
                        <button
                            onClick={handleSave}
                            style={{ backgroundColor: saved ? "#fece51" : "white" }}
                        >
                            <img src="/save.png" alt="" />
                            {saved ? "Place Saved" : "Save the Place"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SinglePage;
