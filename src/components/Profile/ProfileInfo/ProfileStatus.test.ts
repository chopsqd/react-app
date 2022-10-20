import React from "react"
import {create} from "react-test-renderer"
import ProfileStatusOld from "./ProfileStatusOld";
import {updateProfileStatus} from "../../../redux/profile-reducer";

//describe - описываем компонент, который мы тестим
// describe("ProfileStatus component", () => {
//     //Говорим, что тестим
//     test("Status from props should be in the state",() => {
//         //create() - эмулирует создание компоненты
//         const component = create(<ProfileStatusOld status={'Hello world!'}/>)
//         //Создаем объект (экземпляр класса)
//         const instance = component.getInstance()
//         //Проверяем что в объекте в статусе будет текст 'Hello world!'
//         expect(instance.state.status).toBe('Hello world!')
//     })
//
//     test("After creation <span> with status should be displayed",() => {
//         const component = create(<ProfileStatusOld status={'Hello world!'}/>)
//         const root = component.root
//         let span = root.findByType("span")
//         expect(span.length).not.toBeNull()
//     })
//
//     test("After creation <input> shouldn't be displayed",() => {
//         const component = create(<ProfileStatusOld status={'Hello world!'}/>)
//         const root = component.root
//         expect(() => {
//             let input = root.findByType("input")
//         }).toThrow()
//     })
//
//     test("After creation <span> should contains correct status",() => {
//         const component = create(<ProfileStatusOld status={'Hello world!'}/>)
//         const root = component.root
//         let span = root.findByType("span")
//         expect(span.children[0]).toBe('Hello world!')
//     })
//
//     test("Input should be displayed in editMode instead of span",() => {
//         const component = create(<ProfileStatusOld status={'Hello world!'} updateProfileStatus={updateProfileStatus}/>)
//         const root = component.root
//         let span = root.findByType("span")
//         span.props.onDoubleClick()
//         let input = root.findByType("input")
//         expect(input.props.value).toBe('Hello world!')
//     })
//
//     test("Callback should be called",() => {
//         const mockCallback = jest.fn()
//         const component = create(<ProfileStatusOld status={'Hello world!'} updateProfileStatus={mockCallback}/>)
//         const instance = component.getInstance()
//         instance.toggleActivateEditMode()
//         expect(mockCallback.mock.calls.length).toBe(1)
//     })
// })