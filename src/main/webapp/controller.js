    var myApp = angular.module('myApp', []);
    myApp.controller('calculatorCtrl', function($scope) {
//        console.log("Controller");
             $scope.txt = '';
             $scope.numbers = [];
             $scope.operators = [];

             $scope.clearall=function(){
                 $scope.txt='';
                 $scope.numbers = [];
                 $scope.operators = [];

             }

             $scope.calculate = function() {
                 var sum=0;
                 sum=infixToPostfix();
                 $scope.txt=sum.toString();

            };

            $scope.addNumber=function(num) {
                $scope.txt+= num;
            };

            $scope.addOperator = function(operator){
               $scope.txt+= operator;
          };
            function Priority(ch)
            {
                switch (ch)
                {
                case '+':
                case '-':
                    return 1;

                case '*':
                case '/':
                    return 2;
                     }
                return -1;
            }
        function isOperator(ch)
        {
            return (ch=='*'||ch=='/'||ch=='+'||ch=='-');
        }
        function infixToPostfix() //$scope.txt
        {
            var i, k;
            var str=$scope.txt;
            var stack=[];
            var exp=[];
            var prev;
            var result=0

            for (i = 0, k = -1; i<str.length; ++i)
            {
                if(isOperator(str[i]))
                        {
                            while (stack.length!=0 && Priority(str[i]) <= Priority(stack[stack.length-1]))
                            {
                                exp[++k] = stack.pop();
                                }
                            stack.push(str[i]);
                        }
                else{
                prev=i;
                while(!isOperator(str[i])&&i<str.length)
                {
                    i++;
                 }
                 exp[++k]=parseFloat(str.substring(prev,i));
                 i=i-1;
                }
            }
            while (stack.length)
            {
                    exp[++k] = stack.pop();
                    }
            result=evaluatePostfix(exp);
            return result;
        }
        function evaluatePostfix(exp)
        {
            var stack=[];
            var i;

            for (i = 0; i<exp.length; ++i)
            {

                if (!isNaN(exp[i]))
                    stack.push(exp[i]);
                else
                {
                    var val1 = stack.pop();
                    var val2 = stack.pop();
                    switch (exp[i])
                    {
                     case '+': stack.push( val2 + val1); break;
                     case '-': stack.push(val2 - val1); break;
                     case '*': stack.push(val2 * val1); break;
                     case '/': stack.push(val2/val1);   break;
                    }
                }
            }
            return stack.pop();
        }


    });