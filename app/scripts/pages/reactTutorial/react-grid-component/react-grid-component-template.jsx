import React from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
import './react-grid-component-design.scss';
import classes from 'classnames';
import ReactPaginate from 'react-paginate';
const render = function(){
	var gridClass = classes("reactGrid" , this.props.gridDetails.classNames.tableName),
		showFooter = this.state.showFooter ? 'show' : 'hide',
		footerClass = classes("gridFooter",showFooter);
		
	return (
			<Grid className={gridClass} >
				{this.props.getAdditionalRows ? this.props.getAdditionalRows() : ""}			
				{this.getRow("header")}
				<div className="tableDataContainer">
					{/*this.renderLoader()*/}
					{this.getTableBody()}
				</div>
				<div className={footerClass}>
					{this.getPageSize()}
					<div className="pull-right paginationContainer">
					 <ReactPaginate previousLabel={"previous"}
                       nextLabel={"next"}
                       breakLabel={<li className="break"><a href="javascript:void(0)">...</a></li>}
                       pageNum={this.state.pageNum}
                       marginPagesDisplayed={2}
                       pageRangeDisplayed={5}
                       clickCallback={this.handlePageClick}
                       containerClassName={"pagination"}
                       subContainerClassName={"pages pagination"}
                       activeClassName={"active"} />
                     </div>
				</div>
			</Grid>
		);
}

export default render;