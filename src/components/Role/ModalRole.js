import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import _ from 'lodash';

import { updateRole } from '../../services/roleService';

const ModalRole = (props) => {
    const { dataModalRole, show, onHide, fetchRoles } = props;

    const defaultRoleData = {
        url: '',
        description: '',
    };

    const [roleData, setRoleData] = useState(defaultRoleData);

    useEffect(() => {
        if (show) {
            setRoleData({
                id: dataModalRole.id,
                url: dataModalRole.url,
                description: dataModalRole.description,
            });
        }
    }, [show, dataModalRole]);

    const handleOnChangeInput = (value, name) => {
        let _roleData = _.cloneDeep(roleData);
        _roleData[name] = value;
        setRoleData(_roleData);
    };

    const handleConfirmRole = async () => {
        if (!roleData.url) {
            toast.error('URL is required');
            return;
        }

        let res = await updateRole(roleData);
        if (res && res.EC === 0) {
            toast.success(res.EM);
            onHide();
            await fetchRoles();
        } else {
            toast.error(res.EM);
        }
    };

    return (
        <Modal size="lg" show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Role</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="content-body row">
                    <div className="col-12 form-group mb-3">
                        <label className="form-label">
                            URL (<span className="text-danger">*</span>)
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            value={roleData.url || ''}
                            onChange={(event) => handleOnChangeInput(event.target.value, 'url')}
                        />
                    </div>
                    <div className="col-12 form-group">
                        <label className="form-label">Description</label>
                        <input
                            type="text"
                            className="form-control"
                            value={roleData.description || ''}
                            onChange={(event) => handleOnChangeInput(event.target.value, 'description')}
                        />
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleConfirmRole}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalRole;
