import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import _ from 'lodash';

import { createNewUser, fetchGroup, updateCurrentUser } from '../../services/userService';
import './Users.scss';
const ModalUser = (props) => {
    const { action, dataModalUser } = props;

    const defaultUserData = {
        email: '',
        phone: '',
        username: '',
        password: '',
        address: '',
        gender: '',
        group: '',
    };

    const validInputsDefault = {
        email: true,
        phone: true,
        username: true,
        password: true,
        address: true,
        gender: true,
        group: true,
    };

    // const [email, setEmail] = useState('');
    // const [phone, setPhone] = useState('');
    // const [username, setUsername] = useState('');
    // const [password, setPassword] = useState('');
    // const [address, setAddress] = useState('');
    // const [gender, setGender] = useState('Male');
    // const [group, setGroup] = useState('');

    const [userData, setUserData] = useState(defaultUserData);
    const [validInputs, setValidInputs] = useState(validInputsDefault);
    const [userGroups, setUserGroups] = useState([]);

    useEffect(() => {
        getGroups();
    }, []);

    useEffect(() => {
        if (props.show) {
            if (action === 'UPDATE') {
                setUserData({
                    ...dataModalUser,
                    group: dataModalUser.Group ? dataModalUser.Group.id : '',
                });
            } else {
                setUserData({
                    ...defaultUserData,
                    group: userGroups && userGroups.length > 0 ? userGroups[0].id : '',
                });
            }
            setValidInputs(validInputsDefault);
        }
    }, [props.show, action, dataModalUser]);

    const getGroups = async () => {
        let res = await fetchGroup();
        if (res && res.EC === 0) {
            setUserGroups(res.DT);
            if (res.DT && res.DT.length > 0) {
                let groups = res.DT;
                setUserData({ ...userData, group: groups[0].id });
            }
        } else {
            toast.error(res.EM);
        }
    };

    const handleOnChangeInput = (value, name) => {
        let _userData = _.cloneDeep(userData);
        _userData[name] = value;
        setUserData(_userData);
    };

    const checkValidateInput = () => {
        if (action === 'UPDATE') return true;

        setValidInputs(validInputsDefault);
        let arr = ['email', 'phone', 'password', 'group'];
        let check = true;
        for (let i = 0; i < arr.length; i++) {
            if (!userData[arr[i]]) {
                let _validInputs = _.cloneDeep(validInputsDefault);
                _validInputs[arr[i]] = false;
                setValidInputs(_validInputs);

                toast.error(`Empty input ${arr[i]}`);
                check = false;
                break;
            }
        }
        return check;
    };

    const handleConfirmUser = async () => {
        let check = checkValidateInput();
        if (check === true) {
            let res =
                action === 'CREATE'
                    ? await createNewUser({ ...userData, groupId: userData['group'] })
                    : await updateCurrentUser({ ...userData, groupId: userData['group'] });
            if (res && res.EC === 0) {
                toast.success(res.EM);
                props.onHide();
                setUserData({ ...defaultUserData, group: userGroups && userGroups.length > 0 ? userGroups[0].id : '' });
            }
            if (res && res.EC !== 0) {
                toast.error(res.EM);

                let _validInputs = _.cloneDeep(validInputsDefault);
                _validInputs[res.DT] = false;
                setValidInputs(_validInputs);
            }
        }
    };

    const handleCloseModalUser = () => {
        props.onHide();
        setUserData(defaultUserData);
        setValidInputs(validInputsDefault);
    };

    return (
        <>
            <Modal size="lg" show={props.show} className="modal-user" onHide={props.onHide}>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">{props.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="content-body row">
                        <div className="col-12 col-sm-6 form-group ">
                            <label>
                                Email (<span className="red">*</span>)
                            </label>
                            <input
                                type="text"
                                className={validInputs.email ? 'form-control' : 'form-control is-invalid'}
                                value={userData.email}
                                onChange={(event) => handleOnChangeInput(event.target.value, 'email')}
                                disabled={action === 'UPDATE'}
                            />
                        </div>
                        <div className="col-12 col-sm-6 form-group">
                            <label>
                                Phone number (<span className="red">*</span>)
                            </label>
                            <input
                                type="text"
                                className={validInputs.phone ? 'form-control' : 'form-control is-invalid'}
                                value={userData.phone}
                                onChange={(event) => handleOnChangeInput(event.target.value, 'phone')}
                                disabled={props.action === 'UPDATE'}
                            />
                        </div>
                        <div
                            className={
                                action === 'CREATE' ? 'col-12 col-sm-6 form-group' : 'col-12 col-sm-12 form-group'
                            }
                        >
                            <label>Username</label>
                            <input
                                type="text"
                                className={validInputs.username ? 'form-control' : 'form-control is-invalid'}
                                value={userData.username}
                                onChange={(event) => handleOnChangeInput(event.target.value, 'username')}
                            />
                        </div>
                        {action === 'CREATE' && (
                            <div className="col-12 col-sm-6 form-group">
                                <label>
                                    Password (<span className="red">*</span>)
                                </label>
                                <input
                                    type="password"
                                    className={validInputs.password ? 'form-control' : 'form-control is-invalid'}
                                    value={userData.password}
                                    onChange={(event) => handleOnChangeInput(event.target.value, 'password')}
                                />
                            </div>
                        )}
                        <div className="col-12 col-sm-12 form-group">
                            <label>Address</label>
                            <input
                                type="text"
                                className={validInputs.address ? 'form-control' : 'form-control is-invalid'}
                                value={userData.address}
                                onChange={(event) => handleOnChangeInput(event.target.value, 'address')}
                            />
                        </div>
                        <div className="col-12 col-sm-6 form-group">
                            <label>Gender</label>
                            <select
                                className={validInputs.gender ? 'form-select' : 'form-select is-invalid'}
                                value={userData.gender}
                                onChange={(event) => handleOnChangeInput(event.target.value, 'gender')}
                            >
                                <option defaultValue="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div className="col-12 col-sm-6 form-group">
                            <label>
                                Group (<span className="red">*</span>)
                            </label>
                            <select
                                value={userData.group}
                                onChange={(event) => handleOnChangeInput(event.target.value, 'group')}
                                className={validInputs.group ? 'form-select' : 'form-select is-invalid'}
                            >
                                {userGroups.length > 0 &&
                                    userGroups.map((item, index) => {
                                        return (
                                            <option key={`group=${index}`} value={item.id}>
                                                {item.name}
                                            </option>
                                        );
                                    })}
                            </select>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={() => {
                            handleCloseModalUser();
                        }}
                    >
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleConfirmUser()}>
                        {action === 'CREATE' ? ' Save' : 'Update'}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};
export default ModalUser;
