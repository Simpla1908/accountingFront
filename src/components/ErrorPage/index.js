import React from 'react'
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="error-1">

	

		<div className="page main-signin-wrapper bg-primary construction">

			<div className="container ">
				<div className="construction1 text-center details text-white">
					<div className="">
						<div className="col-lg-12">
							<h1 className="tx-140 mb-0">404</h1>
						</div>
						<div className="col-lg-12 ">
							<h1>Oops.The Page you are looking  for doesn't  exit..</h1>
							<h6 className="tx-15 mt-3 mb-4 text-white-50">You may have mistyped the address or the page may have moved. Try searching below.</h6>
							<Link className="btn ripple btn-success text-center mb-2" to="/">Back to Login</Link>
						</div>
					</div>
				</div>
			</div>

		</div>
	

	</div>
  )
}

export default ErrorPage
