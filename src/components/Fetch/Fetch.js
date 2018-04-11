import * as React from 'react';
import {connect} from 'react-redux';

import {Columns} from '../Columns/Columns';
import {Tags} from '../Tags/Tags';

const stateToProps = (state) => ({
    tag: state.tags.current
});

export const Fetch = connect(stateToProps) ( 
    class Fetch extends React.Component {

        state = {
            loading: true,
            cards: [],
            // step: 1,
            firstTime: true
        };

        constructor(props) {
            super(props);

            this.fetchMore = this.fetchMore.bind(this); 
        }

        loading = false; // выносим, как свойство класса, чтобы не было двойных перерисовок далее (лишний раз не дергать setState)

        componentDidMount() {
            this.step = 1;

            this.loading = true;
            this.fetchMore()
                .catch((error) => {
                    this.loading = false;
                    this.setState({
                        loading: false,
                        error
                    });
                });
        } 
        
        componentWillReceiveProps(props){
            if(props.tag !== this.props.tag){
                this.step = 1;
                this.fetchMore();
            }
        }

        async fetchMore(){
            console.log('fetch', this.step);
            //if - чтобы не было "феч на феч"
            if ((!this.loading && !this.state.firstTime) || (this.loading && this.state.firstTime)){
                this.loading = true;
                // let num = this.state.step; // убрали из стэйта в проперти
                let num = this.step;

                // let tag = this.props.tag;
                // let param = 'http://cors-anywhere.herokuapp.com/https://api.qwant.com/api/search/images?count=25&offset='+num*25+'&q='+tag;
                let param = '/data' + num + '.json';
                let response = await fetch(param);
                let json = await response.json();
                let jsonClean = json && json.data && json.data.result && json.data.result.items;
                num++;
                if (num === 6) num = 1; // пока зациклю на мои 5 json файлов
                this.setState({
                    cards: this.state.cards.concat(jsonClean),
                    loading: false,
                    // step: num,
                    firstTime: false
                    }); 
                this.step++;
                this.loading = false;       
            }
        } 
        
        render() {
            if (this.state.loading && this.state.firstTime) {
                return (
                    <div className="spinner">
                    загрузка...
                    </div>
                );
            }

            if (this.state.error) {
                return (
                    <div className="screen">
                        <h1>ERROR: {this.state.error.message}</h1>
                    </div>
                );
            }

            return (
                <React.Fragment>
                    <Columns 
                        Items={this.state.cards}
                        FetchMore={this.fetchMore}
                    />
                    <Tags />
                </React.Fragment>    
            );
        }

    }
)
