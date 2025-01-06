'use client';

import {
   Key,
   useCallback,
   useContext,
   useEffect,
   useMemo,
   useState,
} from 'react';
import {
   CompanyNodeInfoType,
   CompanySelectionType,
   useCreateSCStore,
} from './create/useCreateStore';
import {
   Modal,
   ModalBody,
   ModalContent,
   ModalFooter,
   ModalHeader,
} from '@nextui-org/modal';
import { Form } from '@nextui-org/form';
import { Autocomplete, AutocompleteItem } from '@nextui-org/autocomplete';
import { Input } from '@nextui-org/input';
import { Info } from 'lucide-react';
import { Select, SelectItem } from '@nextui-org/select';
import { Button } from '@nextui-org/button';
import {
   CompanyNodeType,
   SCCreateContext,
} from './create/CreatePageContextProvider';
import useRandomId from '@/hooks/use-random-id';

type FormSupply = {
   outcomeMaterial: string;
   requestedMaterial: string;
   suppliedByCompanyId?: string;
   suppliedToCompanyId?: string;
   isInvite: boolean;
};

export default function NodeCompanyModal({
   isOpen,
   onOpenChange,
   onSubmitHandler,
   formValueDefault,
   formSupplyDefault,
   isDisabled = false,
}: {
   isOpen: boolean;
   onOpenChange: (isOpen: boolean) => void;
   onSubmitHandler?: (
      dataNode: CompanyNodeType,
      dataCompany?: CompanySelectionType
   ) => void;
   formValueDefault?: CompanySelectionType;
   formSupplyDefault?: FormSupply;
   isDisabled?: boolean;
}) {
   const { companyList, companyNodeList } = useContext(SCCreateContext);
   const companyNodeIdList = useMemo(
      () => companyNodeList.map((item) => item.companyId),
      [companyNodeList]
   );
   const companyId = useRandomId();
   const [formValue, setFormValue] = useState<CompanySelectionType>({
      id: formValueDefault?.id ?? '',
      company_email: formValueDefault?.company_email ?? '',
      city: formValueDefault?.city ?? '',
      address: formValueDefault?.address ?? '',
      company_fields: formValueDefault?.company_fields ?? '',
      company_name: formValueDefault?.company_name ?? '',
      company_picture: formValueDefault?.company_picture ?? '',
   });
   const [formIsDisabled, setFormIsDisabled] = useState(isDisabled);
   const [formSupplyValue, setFormSupplyValue] = useState({
      outcomeMaterial: formSupplyDefault?.outcomeMaterial ?? '',
      requestedMaterial: formSupplyDefault?.requestedMaterial ?? '',
      suppliedByCompanyId: formSupplyDefault?.suppliedByCompanyId ?? '',
      suppliedToCompanyId: formSupplyDefault?.suppliedToCompanyId ?? '',
      isInvite: formSupplyDefault?.isInvite ?? false,
   });

   const filteredCompanyList = useMemo(
      () => companyList.filter((item) => !companyNodeIdList.includes(item.id)),
      [companyNodeList, companyList]
   );

   const selectSuppliedCompanyList = useMemo(() => {
      let mapped = companyNodeList.map((item) => {
         let findCompanyData = companyList.find(
            (item2) => item2.id === item.companyId
         );
         return {
            company_id: findCompanyData?.id,
            company_name: findCompanyData?.company_name,
         };
      });
      return mapped.filter((item) => item.company_id !== formValue.id);
   }, [companyNodeList, formValue.id]);

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
      if (onSubmitHandler) {
         onSubmitHandler(
            {
               id: '',
               isInvite: formSupplyValue.isInvite,
               outcomeMaterial: formSupplyValue.outcomeMaterial,
               requestedMaterial: formSupplyValue.requestedMaterial,
               suppliedByCompanyId: formSupplyValue.suppliedByCompanyId,
               suppliedToCompanyId: formSupplyValue.suppliedToCompanyId,
               companyId: formSupplyValue.isInvite ? companyId : formValue.id,
            },
            {
               ...formValue,
               id: formSupplyValue.isInvite ? companyId : formValue.id,
            }
         );
      }

      setFormValue({
         id: '',
         company_email: '',
         city: '',
         address: '',
         company_fields: '',
         company_name: '',
         company_picture: '',
      });
      setFormSupplyValue({
         outcomeMaterial: '',
         requestedMaterial: '',
         suppliedByCompanyId: '',
         suppliedToCompanyId: '',
         isInvite: false,
      });
      onOpenChange(false);
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
                              defaultItems={filteredCompanyList}
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
                              selectedKeys={[
                                 formSupplyValue.suppliedByCompanyId,
                              ]}
                              onSelectionChange={(val) =>
                                 setFormSupplyValue((state) => ({
                                    ...state,
                                    suppliedByCompanyId: val.currentKey!,
                                 }))
                              }
                           >
                              {(comp) => (
                                 <SelectItem key={comp.company_id}>
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
                              selectedKeys={[
                                 formSupplyValue.suppliedToCompanyId,
                              ]}
                              onSelectionChange={(val) =>
                                 setFormSupplyValue((state) => ({
                                    ...state,
                                    suppliedToCompanyId: val.currentKey!,
                                 }))
                              }
                           >
                              {(comp) => (
                                 <SelectItem key={comp.company_id}>
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
}
