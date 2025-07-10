import BpmnModeler from 'bpmn-js/lib/Modeler';

// custom modules
import GridModule from '../base/grid'
import CustomPalette from './modules/palette'

export const defaultModel = `
<?xml version="1.0" encoding="UTF-8"?>

<bpmn2:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmn2="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" id="sample-diagram" targetNamespace="http://bpmn.io/schema/bpmn" xsi:schemaLocation="http://www.omg.org/spec/BPMN/20100524/MODEL BPMN20.xsd">
<bpmn2:process id="Process_1" isExecutable="false">
<bpmn2:startEvent id="StartEvent_1">
<bpmn2:outgoing>Flow_1uk1y8c
</bpmn2:outgoing>
</bpmn2:startEvent>
<bpmn2:task id="Activity_15hg4zd">
<bpmn2:incoming>Flow_1uk1y8c
</bpmn2:incoming>
<bpmn2:outgoing>Flow_1thbg1h
</bpmn2:outgoing>
</bpmn2:task>
<bpmn2:sequenceFlow id="Flow_1uk1y8c" sourceRef="StartEvent_1" targetRef="Activity_15hg4zd" />
<bpmn2:exclusiveGateway id="Gateway_0jb8kvn">
<bpmn2:incoming>Flow_1thbg1h
</bpmn2:incoming>
<bpmn2:incoming>Flow_03hp9ap
</bpmn2:incoming>
<bpmn2:outgoing>Flow_06tfijh
</bpmn2:outgoing>
</bpmn2:exclusiveGateway>
<bpmn2:sequenceFlow id="Flow_1thbg1h" sourceRef="Activity_15hg4zd" targetRef="Gateway_0jb8kvn" />
<bpmn2:exclusiveGateway id="Gateway_0swirmy">
<bpmn2:incoming>Flow_06tfijh
</bpmn2:incoming>
<bpmn2:outgoing>Flow_1e9epkt
</bpmn2:outgoing>
<bpmn2:outgoing>Flow_123wsrp
</bpmn2:outgoing>
</bpmn2:exclusiveGateway>
<bpmn2:sequenceFlow id="Flow_06tfijh" sourceRef="Gateway_0jb8kvn" targetRef="Gateway_0swirmy" />
<bpmn2:task id="Activity_0rd43p9">
<bpmn2:incoming>Flow_1e9epkt
</bpmn2:incoming>
<bpmn2:outgoing>Flow_03hp9ap
</bpmn2:outgoing>
</bpmn2:task>
<bpmn2:sequenceFlow id="Flow_1e9epkt" sourceRef="Gateway_0swirmy" targetRef="Activity_0rd43p9" />
<bpmn2:sequenceFlow id="Flow_03hp9ap" sourceRef="Activity_0rd43p9" targetRef="Gateway_0jb8kvn" />
<bpmn2:task id="Activity_01zvqi8">
<bpmn2:incoming>Flow_123wsrp
</bpmn2:incoming>
<bpmn2:outgoing>Flow_1836h6l
</bpmn2:outgoing>
</bpmn2:task>
<bpmn2:sequenceFlow id="Flow_123wsrp" sourceRef="Gateway_0swirmy" targetRef="Activity_01zvqi8" />
<bpmn2:endEvent id="Event_0t03s9y">
<bpmn2:incoming>Flow_1836h6l
</bpmn2:incoming>
</bpmn2:endEvent>
<bpmn2:sequenceFlow id="Flow_1836h6l" sourceRef="Activity_01zvqi8" targetRef="Event_0t03s9y" />
</bpmn2:process>
<bpmndi:BPMNDiagram id="BPMNDiagram_1">
<bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_1">
<bpmndi:BPMNShape id="_BPMNShape_StartEvent_2" bpmnElement="StartEvent_1"><dc:Bounds x="252" y="172" width="36" height="36" />
</bpmndi:BPMNShape>
<bpmndi:BPMNShape id="Activity_15hg4zd_di" bpmnElement="Activity_15hg4zd"><dc:Bounds x="340" y="150" width="100" height="80" />
</bpmndi:BPMNShape>
<bpmndi:BPMNShape id="Gateway_0jb8kvn_di" bpmnElement="Gateway_0jb8kvn" isMarkerVisible="true"><dc:Bounds x="495" y="165" width="50" height="50" />
</bpmndi:BPMNShape>
<bpmndi:BPMNShape id="Gateway_0swirmy_di" bpmnElement="Gateway_0swirmy" isMarkerVisible="true"><dc:Bounds x="605" y="165" width="50" height="50" />
</bpmndi:BPMNShape>
<bpmndi:BPMNShape id="Activity_01zvqi8_di" bpmnElement="Activity_01zvqi8"><dc:Bounds x="580" y="330" width="100" height="80" />
</bpmndi:BPMNShape>
<bpmndi:BPMNShape id="Activity_0rd43p9_di" bpmnElement="Activity_0rd43p9"><dc:Bounds x="790" y="150" width="100" height="80" />
</bpmndi:BPMNShape>
<bpmndi:BPMNShape id="Event_0t03s9y_di" bpmnElement="Event_0t03s9y"><dc:Bounds x="822" y="352" width="36" height="36" />
</bpmndi:BPMNShape>
<bpmndi:BPMNEdge id="Flow_1uk1y8c_di" bpmnElement="Flow_1uk1y8c"><di:waypoint x="288" y="190" /><di:waypoint x="340" y="190" />
</bpmndi:BPMNEdge>
<bpmndi:BPMNEdge id="Flow_1thbg1h_di" bpmnElement="Flow_1thbg1h"><di:waypoint x="440" y="190" /><di:waypoint x="495" y="190" />
</bpmndi:BPMNEdge>
<bpmndi:BPMNEdge id="Flow_06tfijh_di" bpmnElement="Flow_06tfijh"><di:waypoint x="545" y="190" /><di:waypoint x="605" y="190" />
</bpmndi:BPMNEdge>
<bpmndi:BPMNEdge id="Flow_1e9epkt_di" bpmnElement="Flow_1e9epkt"><di:waypoint x="655" y="190" /><di:waypoint x="790" y="190" />
</bpmndi:BPMNEdge>
<bpmndi:BPMNEdge id="Flow_03hp9ap_di" bpmnElement="Flow_03hp9ap"><di:waypoint x="840" y="150" /><di:waypoint x="840" y="70" /><di:waypoint x="520" y="70" /><di:waypoint x="520" y="165" />
</bpmndi:BPMNEdge>
<bpmndi:BPMNEdge id="Flow_123wsrp_di" bpmnElement="Flow_123wsrp"><di:waypoint x="630" y="215" /><di:waypoint x="630" y="330" />
</bpmndi:BPMNEdge>
<bpmndi:BPMNEdge id="Flow_1836h6l_di" bpmnElement="Flow_1836h6l"><di:waypoint x="680" y="370" /><di:waypoint x="822" y="370" />
</bpmndi:BPMNEdge>
</bpmndi:BPMNPlane>
// 
</bpmndi:BPMNDiagram>
</bpmn2:definitions>
`;

export default function(container: HTMLElement) : BpmnModeler {
    let editor = new BpmnModeler({
        container: "#editor",
        
        additionalModules: [
            GridModule,
            CustomPalette
        ]
    });

    editor.importXML(defaultModel)

    return editor;
}