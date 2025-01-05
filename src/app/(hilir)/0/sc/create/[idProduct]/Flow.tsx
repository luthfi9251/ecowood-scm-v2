'use client';
import { Button } from '@nextui-org/button';
import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/card';
import { Form } from '@nextui-org/form';
import {
   Modal,
   ModalContent,
   ModalHeader,
   ModalBody,
   ModalFooter,
   useDisclosure,
} from '@nextui-org/modal';
import {
   Background,
   BackgroundVariant,
   Controls,
   ReactFlow,
} from '@xyflow/react';
import {
   Autocomplete,
   AutocompleteSection,
   AutocompleteItem,
} from '@nextui-org/autocomplete';
import '@xyflow/react/dist/style.css';
import { Info, Pencil, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { Input } from '@nextui-org/input';
import { Select, SelectItem } from '@nextui-org/select';
import {
   CompanyNodeInfoType,
   CompanySelectionType,
   useCreateSCStore,
} from '../useCreateStore';
import { Key, useCallback, useMemo, useState } from 'react';
import Flow from '@/components/supply-chain-flow/Flow';

const NodeCompanyModal = ({
   isOpen,
   onOpenChange,
}: {
   isOpen: boolean;
   onOpenChange: (isOpen: boolean) => void;
}) => {
   const companyList: CompanySelectionType[] = useCreateSCStore(
      (state) => state.company_list
   );
   const companyNodeList = useCreateSCStore((state) => state.companyNodeList);
   const addCompanyNodeList = useCreateSCStore(
      (state) => state.addCompanyNodeList
   );

   const [formValue, setFormValue] = useState<CompanySelectionType>({
      id: '',
      company_email: '',
      city: '',
      address: '',
      company_fields: '',
      company_name: '',
      company_picture: '',
   });

   const [formIsDisabled, setFormIsDisabled] = useState(false);
   const [isInviteCompany, setIsInviteCompany] = useState(false);
   const [formSupplyValue, setFormSupplyValue] = useState({
      outcomeMaterial: '',
      requestedMaterial: '',
      suppliedByCompanyId: '',
      suppliedToCompanyId: '',
      isInvite: false,
   });

   const selectSuppliedCompanyList = useMemo(
      () =>
         companyNodeList.map((item) => ({
            id_company: item.information.id,
            company_name: item.information.company_name,
         })),
      [companyNodeList]
   );

   const companySelectionChange = useCallback(
      (key: Key | null) => {
         setFormSupplyValue((state) => ({
            ...state,
            isInvite: false,
         }));
         let selected = companyList.find((item) => item.company_name == key);
         if (selected) {
            setFormValue(selected);
            setFormIsDisabled(true);
         }
      },
      [companyList]
   );
   const companyInputChange = useCallback(
      (value: string) => {
         setTimeout(() => {
            let selected = companyList.find(
               (item) => item.company_name == value
            );
            if (!selected) {
               setFormValue({
                  id: '',
                  company_email: '',
                  city: '',
                  address: '',
                  company_fields: '',
                  company_picture: '',
                  company_name: value,
               });
               setFormSupplyValue((state) => ({
                  ...state,
                  isInvite: true,
               }));
               setFormIsDisabled(false);
            }
         }, 1000);
      },
      [companyList]
   );
   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      console.log({ formValue, formSupplyValue });
   };

   return (
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="5xl">
         <ModalContent>
            {(onClose) => (
               <>
                  <Form validationBehavior="native" onSubmit={handleSubmit}>
                     <ModalHeader className="flex flex-col gap-1">
                        Add Company Node
                     </ModalHeader>
                     <ModalBody className="w-full">
                        <fieldset className="grid lg:grid-cols-2 w-full gap-5 border-1 p-3">
                           <legend className="font-semibold">
                              Company Information
                           </legend>
                           <Autocomplete
                              isRequired
                              className=""
                              label="Company Name"
                              labelPlacement="outside"
                              defaultItems={companyList}
                              onSelectionChange={companySelectionChange}
                              onInputChange={companyInputChange}
                              allowsCustomValue
                              variant="bordered"
                              placeholder=" "
                           >
                              {(company: any) => (
                                 <AutocompleteItem key={company.company_name}>
                                    {company.company_name}
                                 </AutocompleteItem>
                              )}
                           </Autocomplete>
                           <Input
                              isRequired
                              isDisabled={formIsDisabled}
                              label="Company Email"
                              labelPlacement="outside"
                              type="email"
                              name="company_email"
                              placeholder=" "
                              variant="bordered"
                              value={formValue.company_email}
                              onValueChange={(val) =>
                                 setFormValue((state) => ({
                                    ...state,
                                    company_email: val,
                                 }))
                              }
                           />
                           <Input
                              isRequired
                              isDisabled={formIsDisabled}
                              label="City"
                              labelPlacement="outside"
                              type="text"
                              name="city"
                              placeholder=" "
                              variant="bordered"
                              value={formValue.city}
                              onValueChange={(val) =>
                                 setFormValue((state) => ({
                                    ...state,
                                    city: val,
                                 }))
                              }
                           />
                           <Input
                              isRequired
                              isDisabled={formIsDisabled}
                              label="Address"
                              labelPlacement="outside"
                              type="text"
                              name="address"
                              placeholder=" "
                              variant="bordered"
                              value={formValue.address}
                              onValueChange={(val) =>
                                 setFormValue((state) => ({
                                    ...state,
                                    address: val,
                                 }))
                              }
                           />
                           <Input
                              isRequired
                              isDisabled={formIsDisabled}
                              label="Company Field"
                              labelPlacement="outside"
                              name="company_fields"
                              type="text"
                              placeholder=" "
                              variant="bordered"
                              value={formValue.company_fields}
                              onValueChange={(val) =>
                                 setFormValue((state) => ({
                                    ...state,
                                    company_fields: val,
                                 }))
                              }
                           />
                        </fieldset>
                        {formSupplyValue.isInvite && (
                           <p className="bg-sky-600 text-white p-1 rounded-sm text-xs flex items-center gap-3 w-fit">
                              <Info className="inline-block" size={15} />
                              <span>
                                 The company you entered does not seem to have
                                 joined our platform, please fill in the
                                 information correctly, we will invite the
                                 company by email
                              </span>
                           </p>
                        )}

                        <fieldset className="grid lg:grid-cols-2 w-full gap-5 border-1 p-3">
                           <legend className="font-semibold">
                              Supply Information
                           </legend>
                           <Input
                              isRequired
                              label="Requested Material"
                              labelPlacement="outside"
                              type="text"
                              name="requested_material"
                              placeholder=" "
                              variant="bordered"
                              value={formSupplyValue.requestedMaterial}
                              onValueChange={(val) =>
                                 setFormSupplyValue((state) => ({
                                    ...state,
                                    requestedMaterial: val,
                                 }))
                              }
                           />
                           <Select
                              label="Supplied by"
                              labelPlacement="outside"
                              variant="bordered"
                              items={selectSuppliedCompanyList}
                              placeholder=" "
                              selectedKeys={formSupplyValue.suppliedByCompanyId}
                              onSelectionChange={(val) =>
                                 setFormSupplyValue((state) => ({
                                    ...state,
                                    suppliedByCompanyId: val.currentKey!,
                                 }))
                              }
                           >
                              {(comp) => (
                                 <SelectItem key={comp.id_company}>
                                    {comp.company_name}
                                 </SelectItem>
                              )}
                           </Select>
                           <Input
                              isRequired
                              label="Outcome Material"
                              labelPlacement="outside"
                              type="text"
                              name="outcome_material"
                              placeholder=" "
                              variant="bordered"
                              value={formSupplyValue.outcomeMaterial}
                              onValueChange={(val) =>
                                 setFormSupplyValue((state) => ({
                                    ...state,
                                    outcomeMaterial: val,
                                 }))
                              }
                           />
                           <Select
                              label="Supplied To"
                              labelPlacement="outside"
                              variant="bordered"
                              placeholder=" "
                              items={selectSuppliedCompanyList}
                              selectedKeys={formSupplyValue.suppliedToCompanyId}
                              onSelectionChange={(val) =>
                                 setFormSupplyValue((state) => ({
                                    ...state,
                                    suppliedToCompanyId: val.currentKey!,
                                 }))
                              }
                           >
                              {(comp) => (
                                 <SelectItem key={comp.id_company}>
                                    {comp.company_name}
                                 </SelectItem>
                              )}
                           </Select>
                        </fieldset>
                     </ModalBody>
                     <ModalFooter className="flex justify-end w-full">
                        <Button
                           color="danger"
                           variant="light"
                           onPress={onClose}
                        >
                           Cancel
                        </Button>
                        <Button
                           className="bg-ecowood-secondary text-white"
                           type="submit"
                        >
                           Add
                        </Button>
                     </ModalFooter>
                  </Form>
               </>
            )}
         </ModalContent>
      </Modal>
   );
};

const NodeCompanyItem = ({
   companyData,
}: {
   companyData: CompanyNodeInfoType;
}) => {
   return (
      <div className="flex w-full gap-3 border-y-1 py-3 px-3 cursor-default">
         <p className="self-center font-bold">1</p>
         <Image
            src={companyData.information.company_picture}
            alt="Company Logo"
            width={50}
            height={50}
            className="aspect-square object-cover rounded-[50%] self-center"
         />
         <div className="grow">
            <h4 className="font-semibold">
               {companyData.information.company_name}
            </h4>
            <table className="text-xs">
               <tbody>
                  <tr>
                     <td>Input</td>
                     <td>:</td>
                     <td>
                        {companyData.requestedMaterial} -{' '}
                        {companyData.suppliedByCompanyId}
                     </td>
                  </tr>
                  <tr>
                     <td>Output</td>
                     <td>:</td>
                     <td>{companyData.suppliedToCompanyId}</td>
                  </tr>
               </tbody>
            </table>
         </div>
         <div className="self-center justify-self-end flex gap-2">
            <Button
               className="bg-sky-700 text-white"
               size="sm"
               startContent={<Pencil size={17} />}
               isIconOnly
            ></Button>
            <Button
               className="bg-rose-700 text-white"
               size="sm"
               startContent={<Trash2 size={17} />}
               isIconOnly
            ></Button>
         </div>
      </div>
   );
};

const NodeCompanySection = () => {
   const { isOpen, onOpen, onOpenChange } = useDisclosure();
   const companyNodeList = useCreateSCStore((state) => state.companyNodeList);
   return (
      <>
         <Card radius="sm">
            <CardHeader>Company List</CardHeader>
            <CardBody className="px-0">
               <div className="grid grid-cols-1 overflow-y-auto max-h-[700px]">
                  {companyNodeList.map((item, idx) => (
                     <NodeCompanyItem key={idx} companyData={item} />
                  ))}
               </div>
            </CardBody>
            <CardFooter>
               <Button
                  className="w-full bg-ecowood-secondary text-white"
                  radius="sm"
                  onPress={onOpenChange}
               >
                  Add Company
               </Button>
            </CardFooter>
         </Card>
         <NodeCompanyModal isOpen={isOpen} onOpenChange={onOpenChange} />
      </>
   );
};

const initialNodes = [
   { id: '1', position: { x: 0, y: 0 }, data: { label: '1' } },
   { id: '2', position: { x: 0, y: 100 }, data: { label: '2' } },
];
const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];

export default function FlowWrapper() {
   return (
      <div
         style={{ width: '100%' }}
         className="grid grid-cols-1 xl:grid-cols-3 gap-3"
      >
         <Flow className="xl:col-span-2 min-h-[500px]" />
         <NodeCompanySection />
      </div>
   );
}
