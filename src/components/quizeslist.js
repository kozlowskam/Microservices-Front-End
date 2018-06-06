import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import { fetchAllQuizes, deleteQuiz } from '../actions/quizes'

class QuizesList extends PureComponent {
    static propTypes = {
      quizes: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
      })).isRequired
    }

    componentWillMount() {
      this.props.fetchAllQuizes()
    }
  
    deleteQuiz(quizId) {
        this.props.deleteQuiz(quizId)
    }

    render() {
      const {quizes} = this.props
      return (
        <div>
          <h1>Welcome to TypeQuiz</h1>
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>
              { quizes.map(quiz => (<tr key={quiz.id}>
                <td>{quiz.id}</td>
                <td>
                    <Link to={ `/quizes/${quiz.id}` }>{quiz.title}</Link>
                </td>
                <td><button onClick={ () => this.deleteQuiz(quiz.id) }>Delete</button></td>
              </tr>)) }
            </tbody>
        </table>
        
        <Link to={ '/createquiz'} target="_blank">Create a new quiz!</Link>
        </div>
      )
    }
  }
  
  
  const mapStateToProps = function (state) {
    return {
      quizes: state.quizes
    }
  }
  
  export default connect(mapStateToProps, {
    fetchAllQuizes,
    deleteQuiz
  })(QuizesList)
  