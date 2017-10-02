let AddNewForm = React.createClass({
    propTypes: {
        computer: React.PropTypes.object.isRequired,
        onChange: React.PropTypes.func.isRequired,
        onSubmit: React.PropTypes.func.isRequired
    },
    onNameChange: function(e) {
        this.props.onChange(Object.assign({}, this.props.computer, {name: e.target.value}));
    },
    onManufacturersChange: function(e) {
        this.props.onChange(Object.assign({}, this.props.computer, {manufacturers: e.target.value}));
    },
    onSubmit: function() {
        this.props.onSubmit(this.props.computer);
    },
    render: function() {
        return (
            React.createElement("form", {},
                React.createElement("input", {
                    type: "text",
                    placeholder: "Name",
                    className:"name",
                    value: this.props.computer.name,
                    onChange: this.onNameChange
                }),
                React.createElement("input", {
                    type: "text",
                    placeholder: "Manufacturers",
                    className:"Manufacturers",
                    value: this.props.computer.manufacturers,
                    onChange: this.onManufacturersChange
                }),
                React.createElement("a", {href: "#"},
                    React.createElement("button", {className:"submitBtn", type: "button", onClick: this.onSubmit}, "Submit"))
            )
        );
    }
});

let FormView = React.createClass({
    propTypes: {
        computer: React.PropTypes.object.isRequired,
        computers: React.PropTypes.array.isRequired,
        onNewComputerChange: React.PropTypes.func.isRequired,
        onSubmitNewComputer: React.PropTypes.func.isRequired
    },
    render: function() {
        return (
            React.createElement("div", {},
                React.createElement("div", {}),
                React.createElement(AddNewForm, {computer: this.props.computer, onChange: this.props.onNewComputerChange, onSubmit: this.props.onSubmitNewComputer}))
        );
    }
});

function updateNewComputer(computer) {
    setState({computer: computer});
}
function addNewComputer(computer) {
    let computerList = state.computers;
    computerList.push(Object.assign({}, {key: computerList.length + 1, id: computerList.length + 1}, computer));
    setState({computers: computerList});
}


let MainPage = React.createClass({
    propTypes: {
        "id": React.PropTypes.number,
        "name": React.PropTypes.string,
        "manufacturers": React.PropTypes.string,
    },
    render: function () {
        return (
            React.createElement("div", {},
                React.createElement(NavMenu, {}),
                React.createElement(showList, state, {}))
        );
    }
});

let AddNewComputerPage = React.createClass({
    
    render: function() {
        return (
            React.createElement("div", {},
                React.createElement(NavMenu, {}),
                React.createElement("h2", {className:"computerName"}, "Add A Computer"),
                React.createElement(FormView, Object.assign({}, state, {
                    onNewComputerChange: updateNewComputer,
                    onSubmitNewComputer: addNewComputer
                })))
        );
    }
});

let ComputerPage = React.createClass({
   
    render: function() {
        return (
            React.createElement("div", {},
                React.createElement(NavMenu,{}),
                React.createElement("h2", {className:"computerName"},this.props.name),
                React.createElement("h4", {className:"computerManufacturers"}, this.props.manufacturers))
        );
    }
});


let ListItem = React.createClass({
    propTypes: {
        "id": React.PropTypes.number,
        "name": React.PropTypes.string,
        "email": React.PropTypes.string
    },

    render: function(){
        return (
            React.createElement("a", {className:"list-group-item", href: "#item/" + this.props.id},
            //React.createElement("li", {}),
                React.createElement("h2", {className:"computer-name"},this.props.name))
        );
    }
}); 

let showList = React.createClass({
    propTypes: {
        "computers": React.PropTypes.array,
    },

    render: function(){
        let theComputerList = this.props.computers.map(function(item){
            return React.createElement(ListItem, item);
        });
        return (
            React.createElement("ul", {className: "list-group"},
                theComputerList
            )
        );
    }
});

let NavMenu = React.createClass({
    render: function() {
        return (
            React.createElement("nav", {className: "navbar navbar-expand-lg navbar-dark bg-dark"},
                React.createElement("div", {className: "navbar-collapse", id: "navbarNav"},
                    React.createElement("ul", {className: "navbar-nav"},
                        React.createElement("li", {className: "nav-item"},
                            React.createElement("a", {className: "nav-link", href: "#"}, "Computer List")
                        ),
                        React.createElement("li", {className: "nav-item"},
                            React.createElement("a", {className: "nav-link", href: "#newitem"}, "Add new computer")
                        )
                    )
                )
            ));}
});

let state = {
    location: ""
};

function setState(changes) {
    let component;
    let componentProperties = {};

    Object.assign(state, changes);

    let splittedUrl = state.location.replace(/^#\/?|\/$/g, "").split("/");

    switch(splittedUrl[0]) {
    case "newitem":
        component = AddNewComputerPage;
        break;
    case "item":
        component = ComputerPage;
        componentProperties = computers.find(i => i.key == splittedUrl[1]);
        break;
    default:
        component = MainPage;
    }

    ReactDOM.render(React.createElement(component, componentProperties), document.getElementById("react-app"));
}

window.addEventListener("hashchange", ()=>setState({location: location.hash}));

setState({location: location.hash, 
    computer:{
        name: "",
        email: ""
    },
    computers: computers 
});