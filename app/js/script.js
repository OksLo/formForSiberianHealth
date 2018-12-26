{
	'use strict';

	let formApp = angular.module('formApp', []);

	formApp.controller('formController', function formController($scope) {
		$scope.fields = [
			{
				name: 'name',
				value: '',
				errorMsg: '',
				placeholder: 'Введите имя',
				label: 'Имя*',
				type: 'text'
			},
			{
				name: 'email',
				value: '',
				errorMsg: '',
				status: '',
				placeholder: 'Введите email',
				label: 'E-mail*',
				type: 'email'
			}
		];
		$scope.formSent = false;

		$scope.submitForm = (event) => {
			event.preventDefault();
			sendData('https://test.com', $scope.fields);
		};

		function sendData(url, data) {
			let formData = new FormData();

			data.forEach((dataItem) => {
				formData.append(dataItem.name, dataItem.value);
			});

			fetch(url, {
				method: 'POST',
				body: formData
			}).then(function (response) {
				return response;
			}).catch((e) => {
			});
			$scope.formSent = true;
		}
	});

	formApp.component('inputField', {
			template: `
				<div class="form__control">
					<svg class='form__icon form__icon__{{$ctrl.field.status}}' ng-if='$ctrl.field.status'>
						<use xlink:href="{{'img/icons.svg#'+$ctrl.field.status}}">
					</svg>
					<input class="form__input" type="{{$ctrl.field.type}}" id="form__control__{{$ctrl.field.name}}" name="{{$ctrl.field.name}}" placeholder="{{$ctrl.field.placeholder}}" required ng-model="$ctrl.field.value" ng-class="{'form__input__invalid': $ctrl.field.errorMsg, 'form__input__failed': $ctrl.field.status === 'failed', 'form__input__success': $ctrl.field.status === 'success'}" ng-change="$ctrl.validateField($event, $ctrl.field.name)">
					<label class="form__label" for="form__control__{{$ctrl.field.name}}">{{$ctrl.field.label}}</label>
					<span class="form__error-msg" ng-show="$ctrl.field.errorMsg">{{$ctrl.field.errorMsg}}</span>
				</div>
			`,
			controller ($scope, $element, $attrs) {
				let ctrl = this;
				console.log('$scope: ', $scope.$parent.$parent.formTest);
				ctrl.validateField = (event, fieldName) => {
					if (formTest[fieldName].checkValidity()) {
						ctrl.field.errorMsg = '';
					} else if (formTest[fieldName].validity.typeMismatch) {
						ctrl.field.errorMsg = 'Неправильный формат!';
					} else {
						ctrl.field.errorMsg = formTest[fieldName].validationMessage;
					};
					if (ctrl.field.status !== undefined) ctrl.checkStatus(ctrl.field);
				};
				ctrl.checkStatus = (field) => {
					if (field.errorMsg) {
						field.status = '';
						$scope.$parent.$parent.formTest[field.name].$setValidity('status', true)
					} else if (Math.random() * 10 > 5) {
						field.status = 'failed';
						field.errorMsg = 'Истек период ожидания';
						$scope.$parent.$parent.formTest[field.name].$setValidity('status', false)
					} else {
						field.status = 'success';
						$scope.$parent.$parent.formTest[field.name].$setValidity('status', true)
					}
				};
			},
			bindings: {
				field: '='
			}
		});
}
