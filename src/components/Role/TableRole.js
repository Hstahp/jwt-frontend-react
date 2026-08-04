import { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import ReactPaginate from 'react-paginate';
import { fetchAllRoles, deleteRole } from '../../services/roleService';
import { toast } from 'react-toastify';
import ModalRole from './ModalRole';

const TableRole = forwardRef((props, ref) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [currentLimit, setCurrentLimit] = useState(3);
    const [totalPages, setTotalPages] = useState(0);
    const [listRoles, setListRoles] = useState([]);

    // Modal Edit
    const [isShowModalRole, setIsShowModalRole] = useState(false);
    const [dataModalRole, setDataModalRole] = useState({});

    useEffect(() => {
        getAllRoles();
    }, [currentPage]);

    useImperativeHandle(ref, () => ({
        fetchListRolesAgain() {
            if (currentPage === 1) {
                getAllRoles();
            } else {
                setCurrentPage(1);
            }
        },
    }));

    const getAllRoles = async () => {
        let response = await fetchAllRoles(currentPage, currentLimit);
        if (response && +response.EC === 0) {
            setListRoles(response.DT.roles);
            setTotalPages(response.DT.totalPages);
        } else {
            toast.error(response.EM);
        }
    };

    const handlePageClick = async (event) => {
        setCurrentPage(+event.selected + 1);
    };

    const handleDeleteRole = async (role) => {
        let response = await deleteRole(role);
        if (response && +response.EC === 0) {
            toast.success(response.EM);
            await getAllRoles();
        } else {
            toast.error(response.EM);
        }
    };

    const handleEditRole = (role) => {
        setDataModalRole(role);
        setIsShowModalRole(true);
    };

    const handleHideModal = () => {
        setIsShowModalRole(false);
        setDataModalRole({});
    };

    return (
        <>
            <table className="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th scope="col">No</th>
                        <th scope="col">Url</th>
                        <th scope="col">Description</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {listRoles && listRoles.length > 0 ? (
                        <>
                            {listRoles.map((item, index) => {
                                return (
                                    <tr key={`row-${index}`}>
                                        <td>{(currentPage - 1) * currentLimit + index + 1}</td>
                                        <td>{item.url}</td>
                                        <td>{item.description}</td>
                                        <td>
                                            <span
                                                title="Edit"
                                                className="edit mb-sm-2"
                                                onClick={() => handleEditRole(item)}
                                            >
                                                <i className="fa fa-pencil"></i>
                                            </span>
                                            <span
                                                title="Delete"
                                                className="delete"
                                                onClick={() => handleDeleteRole(item)}
                                            >
                                                <i className="fa fa-trash-o"></i>
                                            </span>
                                        </td>
                                    </tr>
                                );
                            })}
                        </>
                    ) : (
                        <tr>
                            <td colSpan={5} className="text-center">
                                Not found roles
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            {totalPages > 0 && (
                <div className="role-footer d-flex justify-content-center mt-3">
                    <ReactPaginate
                        nextLabel="next >"
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={3}
                        marginPagesDisplayed={2}
                        pageCount={totalPages}
                        previousLabel="< previous"
                        pageClassName="page-item"
                        pageLinkClassName="page-link"
                        previousClassName="page-item"
                        previousLinkClassName="page-link"
                        nextClassName="page-item"
                        nextLinkClassName="page-link"
                        breakLabel="..."
                        breakClassName="page-item"
                        breakLinkClassName="page-link"
                        containerClassName="pagination"
                        activeClassName="active"
                        renderOnZeroPageCount={null}
                        forcePage={currentPage - 1}
                    />
                </div>
            )}

            <ModalRole
                show={isShowModalRole}
                dataModalRole={dataModalRole}
                onHide={handleHideModal}
                fetchRoles={getAllRoles}
            />
        </>
    );
});

export default TableRole;
