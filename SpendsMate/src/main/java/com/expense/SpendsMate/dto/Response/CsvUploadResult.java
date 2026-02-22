package com.expense.SpendsMate.dto.Response;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class CsvUploadResult {
    private int saved;
    private int skipped;
    private List<String> errors;
}