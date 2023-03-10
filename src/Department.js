import { tsConstructorType } from "@babel/types";
import React, { Component } from "react";
import { variables } from "./Variables.js";

export class Department extends Component {
    constructor(props) {
        super(props);

        this.state = {
            departments: [],
            modalTitle: "",
            DepartmentName: "",
            DepartmentId: 0,

            DepartmentIdFilter: "",
            DepartmentNameFilter: "",
            departmentsWithoutFilter: [],
        }
    }

    FilterFn() {
        var DepartmentIdFilter = this.state.DepartmentIdFilter;
        var DepartmentNameFilter = this.state.DepartmentNameFilter;

        var filteredData = this.state.departmentsWithoutFilter.filter(
            function (el) {
                return el.DepartmentId.toString().toLowerCase().includes(
                    DepartmentIdFilter.toString().trim().toLowerCase()
                ) &&
                    el.DepartmentName.toString().toLowerCase().includes(
                        DepartmentNameFilter.toString().trim().toLowerCase()
                    )
            }
        );

        this.setState({ departments: filteredData });
    }

    sortResult(prop, asc) {
        var sortedData = this.state.departmentsWithoutFilter.sort(function (a, b) {
            if (asc) {
                return (a[prop] > b[prop]) ? 1 : ((a[prop] < b[prop]) ? -1 : 0);
            }
            else {
                return (b[prop] > a[prop]) ? 1 : ((b[prop] < a[prop]) ? -1 : 0);
            }
        });
        this.setState({ departments: sortedData });
    }

    changeDepartmentIdFilter = (e) => {
        this.state.DepartmentIdFilter = e.target.value;
        this.FilterFn();
    }

    changeDepartmentNameFilter = (e) => {
        this.state.DepartmentNameFilter = e.target.value;
        this.FilterFn();
    }

    refreashList() {
        fetch(variables.API_URL + "department")
            .then((response) => response.json())
            .then((data) => {
                this.setState({ departments: data, departmentsWithoutFilter: data });
            });
    }

    componentDidMount() {
        this.refreashList();
    }

    changeDepartmentName = (e) => {
        this.setState({ DepartmentName: e.target.value });
    };

    addClick() {
        this.setState({
            modalTitle: "Add Department",
            DepartmentId: 0,
            DepartmentName: "",
        });
    }

    editClick(dep) {
        this.setState({
            modalTitle: "Edit Department",
            DepartmentId: dep.DepartmentId,
            DepartmentName: dep.DepartmentName,
        });
    }

    createClick() {
        fetch(variables.API_URL + "department", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                DepartmentName: this.state.DepartmentName,
            }),
        })
            .then((res) => res.json())
            .then(
                (result) => {
                    alert(result);
                    this.refreashList();
                },
                (error) => {
                    alert("Failed");
                }
            );
    }

    updateClick() {
        fetch(variables.API_URL + "department", {
            method: "PUT",
            headers: {
                "Accept": "application/json",
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                DepartmentId: this.state.DepartmentId,
                DepartmentName: this.state.DepartmentName,

            }),
        })
            .then((res) => res.json())
            .then(
                (result) => {
                    alert(result);
                    this.refreashList();
                },
                (error) => {
                    alert("Failed");
                }
            );
    }

    deleteClick(id) {

        if (window.confirm('Are you sure?')) {
            fetch(variables.API_URL + "department/" + id, {
                method: "DELETE",
                headers: {
                    "Accept": "application/json",
                    "Content-type": "application/json",
                }
            })
                .then((res) => res.json())
                .then(
                    (result) => {
                        alert(result);
                        this.refreashList();
                    },
                    (error) => {
                        alert("Failed");
                    }
                );
        }
    }

    render() {
        const { departments, modalTitle, DepartmentName, DepartmentId } =
            this.state;

        return (
            <div>
                <button
                    type="button"
                    className="btn btn-primary m-2 float-end"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    onClick={() => this.addClick()}
                >
                    Add Department
                </button>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>
                                <div className="d-flex flex-row">
                                    <input className="form-control m-2" onChange={this.changeDepartmentIdFilter} placeholder="Filter" />
                                    <button type="button" className="btn btn-light" onClick={()=>this.sortResult('DepartmentId',true)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-down" viewBox="0 0 16 16">
                                        <path fillRule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z"/>
                                        </svg>
                                    </button>
                                    <button type="button" className="btn btn-light" onClick={()=>this.sortResult('DepartmentId',false)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-up" viewBox="0 0 16 16">
                                        <path fillRule="evenodd" d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z"/>
                                        </svg>
                                    </button>
                                </div>
                                Department Id
                            </th>
                            <th>
                                <div className="d-flex flex-row">
                                <input className="form-control m-2" onChange={this.changeDepartmentNameFilter} placeholder="Filter" />
                                <button type="button" className="btn btn-light" onClick={()=>this.sortResult('DepartmentName',true)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-down" viewBox="0 0 16 16">
                                        <path fillRule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z"/>
                                        </svg>
                                    </button>
                                    <button type="button" className="btn btn-light" onClick={()=>this.sortResult('DepartmentName',false)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-up" viewBox="0 0 16 16">
                                        <path fillRule="evenodd" d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z"/>
                                        </svg>
                                    </button>
                                </div>
                                Department Name
                            </th>
                            <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {departments.map((dep) => (
                            <tr key={dep.DepartmentId}>
                                <td>{dep.DepartmentId}</td>
                                <td>{dep.DepartmentName}</td>
                                <td>
                                    <button
                                        type="button"
                                        className="btn btn-light mr-1"
                                        data-bs-toggle="modal"
                                        data-bs-target="#exampleModal"
                                        onClick={() => this.editClick(dep)}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="16"
                                            height="16"
                                            fill="currentColor"
                                            className="bi bi-pencil-square"
                                            viewBox="0 0 16 16"
                                        >
                                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                            <path
                                                fillRule="evenodd"
                                                d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                                            />
                                        </svg>
                                    </button>
                                    <button type="button" className="btn btn-light mr-1" onClick={() => this.deleteClick(dep.DepartmentId)}>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="16"
                                            height="16"
                                            fill="currentColor"
                                            className="bi bi-trash-fill"
                                            viewBox="0 0 16 16"
                                        >
                                            <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                                        </svg>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div
                    className="modal fade"
                    id="exampleModal"
                    tabIndex="-1"
                    aria-hidden="true"
                >
                    <div className="modal-dialog modal-lg modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">{modalTitle}</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                ></button>
                            </div>
                            <div className="modal-body">
                                <div className="input-group mb-3">
                                    <span className="input-group-text">DepartmentName</span>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={DepartmentName}
                                        onChange={this.changeDepartmentName}
                                    />
                                </div>
                                {DepartmentId == 0 ? (
                                    <button
                                        type="button"
                                        className="btn btn-primary float-start"
                                        onClick={() => this.createClick()}
                                    >
                                        Create
                                    </button>
                                ) : null}

                                {DepartmentId != 0 ? (
                                    <button type="button" className="btn btn-primary float-start" onClick={() => this.updateClick()}>
                                        Update
                                    </button>
                                ) : null}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
