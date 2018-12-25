"use strict";
import React from "react";

import { ArticleCRUD } from "./ArticleCRUD.js";
import { Modal } from "./Modal.js";

export function SpecificBlogArticle(props) {
    if (props.article) {
        return (
            <div>
                <Modal
                    title="Edición de artículo de Blog"
                    onClose={ props.onClose ? props.onClose : () => {} }
                    wide
                    visible>
                    <ArticleCRUD
                        onSubmit={props.onSubmit}
                        title={props.article.title}
                        lead={props.article.lead}
                        tags=""
                        display_date={props.article.display_date ? new Date(props.article.display_date) : null}
                        real_date={props.article.created_at ? new Date(props.article.created_at) : null}
                        body={props.article.body ? props.article.body : ""}
                        visible={props.article.visible ? true : false}/>
                </Modal>
            </div>
        );
    } else {
        return <span/>;
    }
}