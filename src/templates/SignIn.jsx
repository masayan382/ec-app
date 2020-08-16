import React, { useCallback, useState } from "react";
import { PrimaryButton, TextInput } from "../components/UIkit";
import { signIn } from "../reducks/users/opereations";
import { useDispatch } from "react-redux";

const SignIn = () => {
	const dispatch = useDispatch();

	const [email, setEmail] = useState(),
		[password, setPassword] = useState();

	const inputEmail = useCallback(
		(event) => {
			setEmail(event.target.value);
		},
		[setEmail]
	);

	const inputPassword = useCallback(
		(event) => {
			setPassword(event.target.value);
		},
		[setPassword]
	);

	return (
		<div className='c-section-container'>
			<h2 className='u-text__headline u-text-center'>サインイン</h2>
			<div className='module-spacer--medium' />

			<TextInput
				fullWidth={true}
				label={"email"}
				multiline={false}
				required={true}
				rows={1}
				value={email}
				type={"email"}
				onChange={inputEmail}
			/>

			<TextInput
				fullWidth={true}
				label={"パスワード"}
				multiline={false}
				required={true}
				roes={1}
				value={password}
				type={"password"}
				onChange={inputPassword}
			/>

			<div className='module-spacer--medium' />
			<div className='center'>
				<PrimaryButton
					label={"Sign in"}
					onClick={() => dispatch(signIn(email, password))}
				/>
			</div>
		</div>
	);
};

export default SignIn;
