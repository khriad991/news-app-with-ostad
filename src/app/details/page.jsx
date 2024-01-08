import React from 'react';
import PlainLayout from "@/components/Master/Plain-Layout";
import PopularList from "@/components/User/PopularList";
import NewsDetails from "@/components/NewsDetails";
import CommentsList from "@/components/CommentsList";

const getData =async (id) => {

    const Details = (await (await fetch(`${process.env.HOST}/api/news/details?id=${id}`)).json())['data'];
    const Popular = (await (await fetch(`${process.env.HOST}/api/news/type?type=Popular`)).json())['data'];
    const Comments = (await (await fetch(`${process.env.HOST}/api/comments/news?postID=${id}`)).json())['data'];


    return{Details:Details,Popular:Popular,Comments:Comments}
}

const Page = async (props) => {
    const id = props.searchParams['id'];
    const data = await getData(id);
    return (
        <PlainLayout>
            <div className="container mt-2">
                <div className="row">
                    <div className="col-md-9  col-lg-9 col-sm-12 col-12 px-3">
                        <div className="card">
                            <NewsDetails details={data['Details']} />
                            <CommentsList postID={id} comments={data['Comments']} />
                        </div>
                    </div>
                    <div className="col-md-3 col-lg-3 col-sm-12 col-12 px-3">
                        <PopularList popular={data['Popular']} />
                    </div>
                </div>
            </div>
        </PlainLayout>
    );
};

export default Page;