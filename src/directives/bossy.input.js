(function() {

    /**
     * [Input description]
     * @param {[type]} $compile [description]
     */
    function Input($compile) {

        var templateDefault = '<fieldset class="bossy-fieldset"> <legend class="bossy-legend">{{config.title}}</legend> <div class="bossy-input"> <input type="{{config.type}}" placeholder="{{config.placeholder}}" value="{{config.value}}"/> <span></span> </div> </fieldset>';
        var templatePrefix = '<fieldset class="bossy-fieldset"> <legend class="bossy-legend">{{config.title}}</legend> <div class="bossy-input"> <input class="prefix" type="{{config.type}}" placeholder="{{config.placeholder}}" value="{{config.value}}"/> <span></span> <span class="bossy-input-component bossy-input-prefix">{{config.prefixContent}}</span> </div> </fieldset>';
        var templatePostfix = '<fieldset class="bossy-fieldset"> <legend class="bossy-legend">{{config.title}}</legend> <div class="bossy-input"> <input class="postfix" type="{{config.type}}" placeholder="{{config.placeholder}}" value="{{config.value}}"/> <span></span> <span class="bossy-input-component bossy-input-postfix">{{config.postfixContent}}</span> </div> </fieldset>';
        var templateCounter = '<fieldset class="bossy-fieldset"> <legend class="bossy-legend">{{config.title}}</legend> <div class="bossy-input"> <span class="counter"><span class="inc">{{config.currentLength}}</span>/{{config.max}}</span> <input class="postfix" type="{{config.type}}" placeholder="{{config.placeholder}}" value="{{config.value}}" ng-model="config.value" ng-change="valueChange(config.value)"/> <span></span> <span class="bossy-input-component bossy-input-postfix">{{config.postfixContent}}</span> </div> </fieldset>';

        var getTemplate = function(templateType) {
            var template = '';

            switch (templateType) {
                case 'prefix':
                    template = templatePrefix;
                    break;
                case 'postfix':
                    template = templatePostfix;
                    break;
                case 'counter':
                    template = templateCounter;
                    break;
                default:
                    template = templateDefault;
                    break;
            }
            return template;
        }

        _controller.$inject = ['$scope', '$filter'];

        function _controller($scope, $filter) {
            var config = {
                maxLength: 0,
                height: 200,
                width: 200,
                type: 'text',
                value: '',
                title: 'title',
                currentLength: 0
            };

            $scope.config = angular.extend({}, config, $scope.config);            
            $scope.data = $scope.config.value;

            $scope.valueChange = function(val){
                if($scope.config.currentLength >= $scope.config.max) {
                    $scope.config.value = $scope.config.value.substring(0,$scope.config.max - 1); 
                } 
                $scope.config.currentLength = val.length; 

            }
        }
        return {
            restrict: 'E',
            replace: true,
            scope: {
                config: '='
            },
            link: function(scope, element, attrs) {
                element.html(getTemplate(scope.config.templateType));
                $compile(element.contents())(scope);
            },
            template: templateDefault,
            controller: _controller
        };
    }

    Input.$inject = ['$compile'];

    angular.module('bossy.input', [])
        .directive('bossyInput', Input);
})();