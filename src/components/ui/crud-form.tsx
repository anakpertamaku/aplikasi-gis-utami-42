
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'number' | 'email' | 'password' | 'tel' | 'select' | 'textarea';
  required?: boolean;
  placeholder?: string;
  options?: { value: string; label: string }[];
}

interface CrudFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  fields: FormField[];
  title: string;
  description?: string;
  initialData?: any;
  mode: 'create' | 'edit';
  hideDialog?: boolean;
}

export const CrudForm: React.FC<CrudFormProps> = ({
  isOpen,
  onClose,
  onSubmit,
  fields,
  title,
  description,
  initialData,
  mode,
  hideDialog = false
}) => {
  // Create dynamic schema based on fields
  const createSchema = () => {
    const schemaFields: Record<string, z.ZodTypeAny> = {};
    
    fields.forEach(field => {
      let fieldSchema: z.ZodTypeAny;
      
      switch (field.type) {
        case 'number':
          fieldSchema = z.number();
          break;
        case 'email':
          fieldSchema = z.string().email();
          break;
        default:
          fieldSchema = z.string();
      }
      
      if (field.required) {
        if (field.type === 'number') {
          // For number fields, we don't use min for validation, just make it required
          fieldSchema = fieldSchema;
        } else {
          // For string fields, use min length validation
          fieldSchema = (fieldSchema as z.ZodString).min(1, `${field.label} is required`);
        }
      } else {
        fieldSchema = fieldSchema.optional();
      }
      
      schemaFields[field.name] = fieldSchema;
    });
    
    return z.object(schemaFields);
  };

  const schema = createSchema();
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: initialData || {}
  });

  const handleSubmit = (data: any) => {
    onSubmit(data);
    form.reset();
    if (!hideDialog) {
      onClose();
    }
  };

  const renderField = (field: FormField) => {
    switch (field.type) {
      case 'select':
        return (
          <Select
            onValueChange={(value) => form.setValue(field.name, value)}
            defaultValue={form.getValues(field.name)}
          >
            <SelectTrigger>
              <SelectValue placeholder={field.placeholder || `Select ${field.label}`} />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      
      case 'textarea':
        return (
          <Textarea
            {...form.register(field.name)}
            placeholder={field.placeholder}
            className="min-h-[100px]"
          />
        );
      
      default:
        return (
          <Input
            {...form.register(field.name, {
              valueAsNumber: field.type === 'number'
            })}
            type={field.type}
            placeholder={field.placeholder}
          />
        );
    }
  };

  const FormContent = () => (
    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
      {fields.map((field) => (
        <div key={field.name} className="space-y-2">
          <Label htmlFor={field.name}>
            {field.label}
            {field.required && <span className="text-red-500 ml-1">*</span>}
          </Label>
          {renderField(field)}
          {form.formState.errors[field.name] && (
            <p className="text-sm text-red-500">
              {form.formState.errors[field.name]?.message as string}
            </p>
          )}
        </div>
      ))}
      
      <div className="flex justify-end space-x-2 pt-4">
        {!hideDialog && (
          <Button type="button" variant="outline" onClick={onClose}>
            Batal
          </Button>
        )}
        <Button type="submit">
          {mode === 'edit' ? 'Update' : 'Tambah'}
        </Button>
      </div>
    </form>
  );

  if (hideDialog) {
    return <FormContent />;
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        <FormContent />
      </DialogContent>
    </Dialog>
  );
};
