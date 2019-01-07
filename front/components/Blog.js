"use strict";
import React from "react";
import MarkdownIt from "markdown-it";
import { SiteContext } from "../ContextManager.js";
import { Link } from "react-router-dom";

function createSlug(text) {
    return String(text).trim().replace(" ", "-").replace(/[^a-zA-Z0-9\-\̣_]/g, "-");
}

function BlogPost(props) {
    const date_obj = new Date(props.date);
    const date = date_obj.toDateString();

    let body_contents = null;
    let about = null;
    let lead_class = ["blogPost__lead"];

    if (props.body) {
        const md = MarkdownIt();
        const getBody = () => ({ "__html": md.render(props.body) });
        
        body_contents = <div className="blogPost__body" dangerouslySetInnerHTML={getBody()} />;
        lead_class.push("blogPost__lead--hasBody");
        about = (
            <div className="blogAboutAuthor">
                <div className="blogAboutAuthor__title">About the Author</div>
                <div className="blogAboutAuthor__picture"></div>
                <div className="blogAboutAuthor__bio">
                    Nicolas Zerpa is a experienced Web Developer with more than 10 years of experience.
                    During his career, he has worked with important clients who demanded robust and reliable
                    websites visited my millions of people every day.
                </div>
            </div>
        );
    }
    
    return (
        <article className="blogPost">
            <h1 className="blogPost__title">
                <Link className="blogPost__titleLink" to={`/blog/post/${createSlug(props.title)}/${props.id}`}>{props.title}</Link>
            </h1>
            <div className="blogPost__date">{date}</div>
            <div className={lead_class.join(" ")}>{props.lead}</div>
            {body_contents}
            {about}
        </article>
    );
}

function PageHeader(props) {
    return (
        <section className="pageTitle">
            <div className="container container--withSpace">
                <h1 className="pageTitle__title">{props.title}</h1>
            </div>
        </section>
    );
}

export default class Blog extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.loadPosts();
    }
    
    shouldComponentUpdate(next_props, next_state) {
        if (next_props.match && next_props.match.params) {
            if (next_props.match.params.offset) {
                this.loadPosts(next_props);
                return false;
            }
        }
        return false;
    }

    loadPosts(next_props) {

        const props = Object.assign({}, this.props);
        if (next_props) {
            Object.assign(props, next_props);
        }

        window.scrollTo(0, 0);

        let params = {
            "id": null,
            "offset": 0
        };

        if (props.match && props.match.params) {
            if (props.match.params.id) {
                params.id = props.match.params.id;
            } else if (props.match.params.offset) {
                params.offset = props.match.params.offset;
            }
        }

        this.context.blog_load(params);
    }

    render() {
        let blog_contents = null;

        if (this.context.blog_loading) {
            blog_contents = <div className="loading"/>;
        } else if (this.context.blog_specific_post) {
            const post = this.context.blog_specific_post;
            blog_contents = <BlogPost
                key={post.id}
                id={post.id}
                title={post.title}
                lead={post.lead}
                date={post.display_date}
                body={post.body}/>;
        } else if(this.context.blog_posts && this.context.blog_posts.results) {
            blog_contents = this.context.blog_posts.results.map(function (post) {
                return <BlogPost
                    id={post.id}
                    key={post.id} 
                    title={post.title}
                    date={post.display_date}
                    lead={post.lead}/>
            });

            if (this.context.blog_posts.more_items_available) {
                const new_offset = this.context.blog_posts.offset;
                blog_contents.push(
                    <div class="blog__loadMore">
                        <Link to={`/blog/more/${new_offset}`} className="button" key="load-more">Cargar más</Link>
                    </div>
                );
            }
        }
        return (
            <div>
                <PageHeader title="Blog"/>
                <div className="blog">{blog_contents}</div>
            </div>
        );
    }
}
Blog.contextType = SiteContext;
