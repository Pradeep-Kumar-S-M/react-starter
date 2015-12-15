import React from 'react';
import Template from './react-grid-component-template.jsx';
import {Row, Col} from 'react-bootstrap';
import classes from 'classnames';

const reactGrid = React.createClass({

	getInitialState(){
		return{
			pageNum : 0,
			showFooter : false ,
			pageSize : this.props.pages[0],
			initialPosition : 0,
			dataLength : 0,
			async :false,
			data:0,
			totalIncidents : 0
		};
	},

	componentWillMount() {
		this.setState({
			data:this.props.data ? this.props.data : 0,
			showError : false,
			noData: this.props.noData
		})
	},

	componentWillReceiveProps(nextProps) {
		var gridData = nextProps.data ? nextProps.data : [],
			gridLength = gridData.length,
			async = nextProps.async,
			currentPageNum = 0,
			paginatedData = [],
			pagination = false,
			totalIncidents = 0;


		if(async){
			currentPageNum = Math.ceil(gridData.count / this.state.pageSize);
			pagination = currentPageNum ? true : false;
			paginatedData = gridData.data ? gridData.data : [];
			totalIncidents = gridData.count;
		}else{
			if(gridLength && (gridLength > this.state.pageSize)){
				currentPageNum = Math.ceil(gridLength / this.state.pageSize);
				pagination = true;
			}	
		}
		
		this.setLoading(nextProps.showLoader);
		this.setState({
			data: async ? paginatedData : gridData,
			noData:nextProps.noData,
			pageNum : currentPageNum,
			showFooter : pagination,
			initialPosition : 0,
			dataLength : gridLength,
			async : async,
			totalIncidents : totalIncidents
		})
	},

	getDefaultProps(){
		return{
			pages : [25,50,100,500] 
		}
	},

	showColumns(tbodyData, column, rowIndex){
		var displayData ;
		if(column.serverDataKey === 'serialNo'){
			return ++rowIndex + this.state.initialPosition;
		} else if(column.renderColumn){
			displayData = column.renderColumn(tbodyData, column.serverDataKey);
			return displayData? displayData : "-";
		} else {
			displayData = tbodyData[column.serverDataKey];
			return displayData? displayData : "-";
		}
	},

	setPageSize(event){
		var newPageSize = parseInt(event.target.value);
		this.setState({
			pageSize : newPageSize,
			initialPosition : 0,
			pageNum : Math.ceil(this.state.dataLength / newPageSize)
		});

		if(this.props.async){
			this.props.onPageSizeChange(newPageSize, this.state.pageNum);	
		}
		
	},

	getPageSize(){
		var options;
		options = this.props.pages.map(function(key,index){
						return <option value={key} key={index}>{key}</option>	
		 			});
		
		return (
			<div className="pageSizeContainer pull-left">
				<label for="pageSize">Page size: </label>
				<select id="pageSize" ref="pages" onChange={this.setPageSize}>{options}</select>
			{(this.props.async) ? <span className="totalIncidents">Total Incidents : {this.state.totalIncidents} </span> : ""}
			</div>
		);

	},

	handlePageClick(data){
		if(this.props.async){
			this.props.onPageChange(++data.selected);
		} else {
			this.setState({
				initialPosition : (data.selected * this.state.pageSize)
			})
		}
		
	},

    getRow(option, tbodyData, rowIndex){
    	var gridStructure = this.props.gridDetails,
    		columnDetails = gridStructure.columnDetails,
    		tableClassNames = gridStructure.classNames,
			columnNames = Object.keys(columnDetails),
			column,
			optedColumns,
			rowClass,
			colStyle,
			columnClasses;



		if(option === "header"){
			rowClass = classes(tableClassNames.headerRowClass, "reactGridDataRow");

			optedColumns = columnNames.map(function(key, index){
				column = columnDetails[key];
				colStyle = {width:column.columnWidth};
				
				columnClasses = classes("reactGridCol",column.columnClass,{
					"removeFlex" : column.columnWidth
				});

				if(column.hasChildren){
					var childColumnNames = Object.keys(column.childColumns),
					childColumns,
					childColumn,
					childColumnClass;

					columnClasses = classes(columnClasses , "sectionWrapper");

					childColumns = childColumnNames.map(function(childKey, index){
						childColumn = column.childColumns[childKey];
						childColumnClass = classes(tableClassNames.tbodyColClass,"reactGridCol",{
							"removeFlex" : childColumn.columnWidth
						},childColumn.columnClass);

						return (<Col className={childColumnClass} key={childKey} > 
									<span className="headingText">{childColumn.columnHeading ? childColumn.columnHeading : childKey} </span>
								</Col>)
					});
					return (<Col className={columnClasses} key={key} style={colStyle}>
								<div className="sectionHeading">{column.sectionHeading}</div> 
								<div className="sectionContainer">{childColumns} </div>
							</Col>);
				}
				
					return <Col className={columnClasses} key={key} style={colStyle}> <span className="headingText">{column.columnHeading ? column.columnHeading : key}</span> </Col>
			});

		}else{
			rowClass = classes(tableClassNames.tbodyRowClass, "reactGridDataRow",{
				        "evenColor": (rowIndex % 2 === 0),
				        "oddColor" : (rowIndex % 2 === 1)
			});
			

			optedColumns = columnNames.map(function(key, index){
				column = columnDetails[key];
				colStyle = {width:column.columnWidth};
				columnClasses = classes(tableClassNames.tbodyColClass,"reactGridCol",{
					"removeFlex" : column.columnWidth
				},column.columnClass);

				if(column.hasChildren){
					var childColumnNames = Object.keys(column.childColumns),
						childColumn,
						childColumns,
						childColumnClass;

					

					childColumns = childColumnNames.map((childKey, index) => {
						childColumn = column.childColumns[childKey];
						columnClasses = classes(columnClasses , "sectionWrapper");

						childColumnClass = classes(tableClassNames.tbodyColClass,"reactGridCol",{
							"removeFlex" : childColumn.columnWidth
						},childColumn.columnClass);
									
									return (<Col className={childColumnClass} key={childKey} > 
												{this.showColumns(tbodyData, childColumn, rowIndex)}
											</Col>);
					});

					
				}

					return (	<Col className={columnClasses} 
									 key={key} 
								 	 style={colStyle}>
								 	 	{column.hasChildren ? <div className="sectionContainer" > {childColumns} </div> :  <span className="tbodyText">{this.showColumns(tbodyData, column, rowIndex)}</span>}
								</Col>
							);

			
			}.bind(this));
		}
		

		return <Row className={rowClass}>
		{optedColumns}
		</Row>;
    },

	getTableBody(){
		var data = this.state.data,
			noData = this.state.noData,
			async = this.props.async,
			sendDataToParent = this.props.paginated,
			objectKeys,
			keyData,
			outputData,
			requiredData,
			finalPosition,
			sendData = [];


			if(async && data.length){
				outputData = data.map(function(data, index) {
					return this.getRow("body",data, index);
				}.bind(this));
			}
			else if(data.length || Object.keys(data).length){
				objectKeys = Object.keys(data);
				finalPosition = this.state.initialPosition + this.state.pageSize;
				requiredData = objectKeys.slice(this.state.initialPosition , finalPosition);
				
				if(sendDataToParent){
					sendData = data.slice(this.state.initialPosition , finalPosition);
					sendDataToParent(sendData);	
				}
				outputData = requiredData.map(function(key, index) {
					keyData = data[key];
					keyData.rowKey = key;
					return this.getRow("body",keyData, index);
				}.bind(this));
			
			}else if(noData){
				if(sendDataToParent){
					sendDataToParent(sendData);	
				}
				outputData = (
					<div className="noDataRow">
						Data Not Available
					</div>
				);
			}
		
		return outputData;
	},
	render : Template
})


export default reactGrid;