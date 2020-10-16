import React, {useCallback} from 'react';
import {useDispatch, useSelector} from "react-redux";
// import {getUsername} from "../reducks/users/selectors";
import {getUserEmail} from "../reducks/users/selectors";
import { push } from "connected-react-router";
import { PrimaryButton, TextDetail } from "../components/UIkit";

const UserMyPage = () => {
    const dispatch = useDispatch();
    const selector = useSelector((state) => state);
    const userEmail = getUserEmail(selector);

    const transition = useCallback((path) => {
        dispatch(push(path))
    }, []);

    return (
        <section className="c-section-container">
            <h2 className="u-text__headline u-text-center">マイページ</h2>
            <div className="module-spacer--medium" />
            <TextDetail label="ユーザーEmail" value={userEmail} />
            <div className="module-spacer--small" />
            <div className="center">
                {/* <SecondaryButton label={"カード情報の編集"} onClick={() => transition('/user/payment/edit')} /> */}
                <PrimaryButton label={"注文履歴の確認"} onClick={() => transition('/order/history')}/>
            </div>
        </section>
    );
};

export default UserMyPage;