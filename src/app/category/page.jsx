import React from 'react';
import PlainLayout from "@/components/Master/Plain-Layout";
import NewsList from "@/components/User/NewsList";
import PopularList from "@/components/User/PopularList";
import data from "bootstrap/js/src/dom/data";

const getData = async (id) => {
    const Popular =(await (await  fetch(`${process.env.HOST}/api/news/type?type=Popular`)).json())['data']
    const News = (await (await fetch(`${process.env.HOST}/api/news/category?catID=${id}`)).json())["data"]

    return {Popular:Popular,News:News}
}
const Page =async (props) => {
    let id = props.searchParams["id"];
    const data = await getData(id)
    return (
        <PlainLayout>
            <div className="container mt-5">
                <hr className="" />
                <div className="row">
                    <div className="col-md-9 col-lg-9 col-sm-12 col-12 px-3">
                        <NewsList latest={data["News"]} />
                    </div>
                    <div className="col-md-3 col-lg-3 col-sm-12 col-12 px-3">
                        <PopularList popular={data["Popular"]}  />
                    </div>
                </div>
            </div>
        </PlainLayout>
    );
};

export default Page;