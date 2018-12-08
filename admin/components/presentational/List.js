"use strict";

import React from "react";
import PropTypes from "prop-types";

export class List extends React.Component {
    
    constructor(props) {
        super(props);

        this.runFilter = this.runFilter.bind(this);
        this.updateFilter = this.updateFilter.bind(this);
        this.runLoadMore = this.runLoadMore.bind(this);
        this.runNewItem = this.runNewItem.bind(this);

        let latest_row_id = null;

        if (props.data && props.data.length > 0 && props.data[props.data.length - 1].id) {
            latest_row_id = props.data[props.data.length - 1].id;
        }

        this.state = {
            "filter": "",
            "latest_row_id": latest_row_id
        };
    }
    
    runFilter(event) {
        event.preventDefault();
        
        if (this.props.onFilter) {
            this.props.onFilter(this.state.filter);
        }
    }

    runNewItem(event) {
        event.preventDefault();

        if (this.props.onNewItem) {
            this.props.onNewItem();
        }
    }

    updateFilter(event) {
        this.setState({
            "filter": event.target.value
        });
    }

    runLoadMore(event) {
        event.preventDefault();

        if (this.props.onLoadMore) {
            this.props.onLoadMore(this.state.latest_row_id);
        }
    }
    
    render() {
        const props = this.props;

        const cols = [];
        
        for (let i = 0; i < props.cols.length; i++) {
            const col = props.cols[i];
            let col_key, col_label;

            if (typeof col == "object" && !(col instanceof String)) {
                col_key = "th-" + col.key;
                col_label = col.label;
            } else {
                col_key = "th-index-" + i;
                col_label = col;
            }
            cols.push(<th className="itemList__colName" key={col_key}>{col_label}</th>);
        }

        let tbody;
        let load_more = "";

        if (props.loading) {
            tbody =
            <tr>
                <td
                    className="itemList__cell itemList__cell--loading"
                    colSpan={1 + cols.length}>Cargando...</td>
            </tr>;
        } else {
            const rows = [];
            
            for (let i = 0; i < props.data.length; i++) {
                const new_row = [];
                const row_key = `row-${i}`;
                const row_data = props.data[i];

                for(let i2 = 0; i2 < props.cols.length; i2++) {
                    const col = props.cols[i2];
                    const cell_key = `${row_key}-cell-${i2}`;
                    const cell_value = (col.key && row_data[col.key]) ? row_data[col.key] : "";

                    new_row.push(<td className="itemList__cell" key={cell_key}>{cell_value}</td>);
                }

                const actions = [];

                if (props.actions) {
                    for (let i2 = 0; i2 < props.actions.length; i2++) {
                        const action = props.actions[i2];
                        const className = action.className ? action.className : "";
                        const label = action.label ? action.label : "";
                        const onClick = action.onClick ? action.onClick : function () {};

                        if (actions.length > 0) {
                            actions.push(" ");
                        }
                        const runOnClick = function (event) {
                            event.preventDefault();
                            onClick(row_data);
                        };
                        actions.push(<a key={"k" + i2} href="" className={"button is-small " + className} onClick={runOnClick}>{label}</a>);
                    }
                }

                new_row.push(<td key={new_row + "-actions"}>
                    {actions}
                </td>);

                rows.push(<tr key={row_key}>{new_row}</tr>);

                this.latest_row_id = new_row.id;
            }
            tbody = rows;
            
            if (props.hasMore) {
                load_more = <div className="has-text-centered">
                    <a
                        href=""
                        onClick={this.runLoadMore}
                        className="button is-expanded">Cargar más</a>
                </div>;
            }
        }

        let new_item = "";
        if (props.hasNewItem) {
            new_item = (
                <div className="level-right">
                    <div className="level-item">
                        <a className="button is-link" href="" onClick={this.runNewItem}>Nuevo item</a>
                    </div>
                </div>
            );
        }

        return (
            <div>
                <div className="level">
                    <div className="level-left">
                        <div className="level-item">
                            <form className="is-expanded" onSubmit={this.runFilter}>
                                <div className="field has-addons is-expanded">
                                    <div className="control is-expanded">
                                        <input
                                            type="text"
                                            className="input"
                                            value={this.state.filter}
                                            onChange={this.updateFilter}/>
                                    </div>
                                    <div className="control">
                                        <button className="button is-link">Filtrar</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    {new_item}
                </div>
                <table className="table is-fullwidth">
                    <thead>
                        <tr>
                            {cols}
                            <th className="itemList__colName">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tbody}
                    </tbody>
                </table>
                {load_more}
            </div>
        );
    }
}
List.propTypes = {
    "data": PropTypes.array,
    "onFilter": PropTypes.func,
    "onNewItem": PropTypes.func,
    "onLoadMore": PropTypes.func,
    "cols": PropTypes.array,
    "loading": PropTypes.bool,
    "actions": PropTypes.array,
    "hasMore": PropTypes.bool,
    "hasNewItem": PropTypes.bool
};
